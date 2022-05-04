import flask
from flask import Flask, jsonify
from src.model_testing import build_model

app = Flask(__name__)

@app.route("/")
def hello():
  return "Hello World!"

@app.route("/test_model", methods=['POST'])
def test_model():
  json_data = flask.request.json
  return jsonify(build_model(**json_data))




if __name__ == "__main__":
  app.run()