from werkzeug.wrappers import Request, Response
from werkzeug.serving import run_simple
import json

from PIL import Image
import torchvision.transforms as transforms
import torch
from io import BytesIO
import json
import base64

from model import UNet
from image_processing import imageLoader
from get_prediction import get_prediction

model = UNet()

model.load_state_dict(torch.load("models/BrainMRIBest.pth", map_location='cpu'))
model.eval()



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
        if request.path == '/testpost':
            response = Response();
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Content-Type'] = 'text/plain'
            response.data = json.dumps(json.loads(request.data)['image'])
            return response

        if request.path == '/mri':
            response = Response()
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Content-Type'] = 'application/json'
            img_bytes = base64.b64decode(json.loads(request.data)['image'])
            img = imageLoader(img_bytes)
            segmented_image = get_prediction(model, img)

            processed_image_buffer = BytesIO()
            segmented_image.save(processed_image_buffer, format="PNG")
            processed_image_base64 = base64.b64encode(processed_image_buffer.getvalue())

            response_data = json.dumps({"processed_image": processed_image_base64.decode("utf-8")})

            response.data = response_data
            return response;

    response = Response()
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Content-Type'] = 'text/plain'
    response.data = 'Not found'
    return response

if __name__ == '__main__':
  run_simple('127.0.0.1', 4000, application, use_debugger=True, use_reloader=True)
    