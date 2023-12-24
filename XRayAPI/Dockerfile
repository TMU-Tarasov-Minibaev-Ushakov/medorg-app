# syntax=docker/dockerfile:1.4
FROM --platform=$BUILDPLATFORM python:3.9.6-slim AS xray-server

WORKDIR /app

COPY requirements.txt /app
RUN pip3 install -r requirements.txt

COPY . /app

ENTRYPOINT ["python3"]
CMD ["main.py"]