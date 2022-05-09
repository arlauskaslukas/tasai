import flask
from flask import Flask, jsonify
from src.model_testing import build_model
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def hello():
    return "Hello World!"


@app.route("/test_model", methods=['POST'])
@cross_origin()
def model_env():
    json_data = flask.request.json
    response = build_model(**json_data)
    return jsonify(response)


if __name__ == "__main__":
    app.run()
