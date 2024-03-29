from werkzeug.wrappers import Request, Response
from werkzeug.serving import run_simple
import json

from PIL import Image
import torchvision.transforms as transforms
import torch
from io import BytesIO
import json
import base64

from model import PneumoniaResnet
from utils import imageLoader, write_activations
from layer_activation import LayerActivations

model = PneumoniaResnet()

model.load_state_dict(torch.load("./models/PneumoniaResNet.pth", map_location='cpu'))
model.eval()

acts = LayerActivations(model)


@Request.application
def application(request):
    if request.method == 'OPTIONS':
        response = Response()
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        return response

    if request.method == 'GET':
        if request.path == '/healthcheck':
            response = Response()
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Content-Type'] = 'text/plain'
            response.data = 'OK'
            return response
        
    if request.method == 'POST':
        if request.path == '/xray':
            response = Response()
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Content-Type'] = 'application/json'
            file = request.files['image']
            if not file:
                response.data = json.dumps({"error": "no image"})
                return response
            img_bytes = file.read()
            img = imageLoader(img_bytes)
            activation_map, predicted_class  = write_activations(img, model, acts)

            processed_image_buffer = BytesIO()
            activation_map.save(processed_image_buffer, format="PNG")
            processed_image_base64 = base64.b64encode(processed_image_buffer.getvalue())

            response_data = json.dumps({"predicted_class": predicted_class.cpu().numpy().tolist(), "processed_image": processed_image_base64.decode("utf-8")})

            response.data = response_data
            return response;

    response = Response()
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Content-Type'] = 'text/plain'
    response.data = 'Not found'
    return response

if __name__ == '__main__':
  run_simple('0.0.0.0', 8000, application, use_debugger=True, use_reloader=True)
    