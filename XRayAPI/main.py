from werkzeug.wrappers import Request, Response
from werkzeug.serving import run_simple
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

model.load_state_dict(torch.load("models/PneumoniaResNet.pth", map_location='cpu'))
model.eval()

acts = LayerActivations(model)

@Request.application
def application(request):
    if request.method == 'POST':
        file = request.files['image']
        img_bytes = file.read()
        img = imageLoader(img_bytes)
        activation_map, predicted_class  = write_activations(img, model, acts)

        processed_image_buffer = BytesIO()
        activation_map.save(processed_image_buffer, format="PNG")
        processed_image_base64 = base64.b64encode(processed_image_buffer.getvalue())

        # Build and return JSON response
        response_data = json.dumps({"predicted_class": predicted_class.cpu().numpy().tolist(), "processed_image": processed_image_base64.decode("utf-8")})
        return Response(response_data, mimetype="application/json")
    else:
        return Response('Only POST requests are accepted', status=405, content_type='text/plain')
 
if __name__ == '__main__':
    run_simple('localhost', 4000, application)