from werkzeug.wrappers import Request, Response
from werkzeug.serving import run_simple
import json
import pandas as pd

from utils.encode import encode
from utils.categorical_cols import categorical_cols

import joblib

model = joblib.load('HeartDiseaseApi\models\KNeighborsClassifier().joblib')

encoder = joblib.load('HeartDiseaseApi\encoders\label_encoders.joblib')

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

        if request.path == '/classify':
            response = Response()
            response.headers['Access-Control-Allow-Origin'] = '*'
            response.headers['Content-Type'] = 'application/json'

            data = request.json()
            df = pd.DataFrame(data)

            df = encode(categorical_cols=categorical_cols,
                        df=df,
                        label_encoders=encoder)
            
            result = model.predict(df)

            response_data = json.dumps({'result': result.tolist()})

            response.data = response_data
            
            return response
            

    response = Response()
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Content-Type'] = 'text/plain'
    response.data = 'Not found'
    return response

if __name__ == '__main__':
  run_simple('127.0.0.1', 7000, application, use_debugger=True, use_reloader=True)