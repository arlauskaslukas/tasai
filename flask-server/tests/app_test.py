from src.app import app


def test_get_hello():
    response = app.test_client().get("/")
    assert response.status_code == 200


def test_model_with_dense_should_return_ok():
    model = {
        "optimizer": "adam",
        "loss": "sparse_categorical_crossentropy",
        "metrics":
            [
                {
                    "name": "accuracy"
                }
            ],
        "dataset": "MNIST",
        "epochs": "2",
        "layers": [
            {
                "title": "Flatten",
                "hyperparameters": {
                    "input_shape": "(28,28)"
                }
            },
            {
                "title": "Dense",
                "hyperparameters": {
                    "units": "32",
                    "activation": "relu"
                }
            },
            {
                "title": "Dense",
                "hyperparameters": {
                    "units": "64",
                    "activation": "relu"
                }
            },
            {
                "title": "Dense",
                "hyperparameters": {
                    "units": "128",
                    "activation": "softmax"
                }
            }
            ]
        }
    response = app.test_client().post("/test_model", json=model)
    assert response.json['model'] is not None
    assert response.json['success_status'] is True
    assert response.status_code == 200


def test_model_with_dense_should_return_compilation_error():
    model = {
        "optimizer": "badam",
        "loss": "sparse_categorical_crossentropy",
        "metrics": [
            {
                "name": "accuracy"
            }
        ],
        "dataset": "MNIST",
        "epochs": "2",
        "layers": [
            {
                "title": "Flatten",
                "hyperparameters": {
                    "input_shape": "(28,28)"
                }
            },
            {
                "title": "Dense",
                "hyperparameters": {
                    "units": "32",
                    "activation": "relu"
                }
            },
            {
                "title": "Dense",
                "hyperparameters": {
                    "units": "64",
                    "activation": "relu"
                }
            },
            {
                "title": "Dense",
                "hyperparameters": {
                    "units": "128",
                    "activation": "softmax"
                }
            }
        ]
    }
    response = app.test_client().post("/test_model", json=model)
    assert response.json['error'] is not None
    assert response.json['success_status'] is False
    assert response.status_code == 200


def test_model_with_dense_should_return_no_dataset():
    model = {
        "optimizer": "adam",
        "dataset": "-",
        "loss": "sparse_categorical_crossentropy",
        "epochs": "2",
        "metrics": [
            {
                "name": "accuracy"
            }
        ],
        "layers": [
            {
                "title": "Flatten",
                "hyperparameters": {
                    "input_shape": "(28,28)"
                }
            },
            {
                "title": "Dense",
                "hyperparameters": {
                    "units": "32",
                    "activation": "relu"
                }
            },
            {
                "title": "Dense",
                "hyperparameters": {
                    "units": "64",
                    "activation": "relu"
                }
            },
            {
                "title": "Dense",
                "hyperparameters": {
                    "units": "128",
                    "activation": "softmax"
                }
            }
        ]
    }
    response = app.test_client().post("/test_model", json=model)
    assert response.json['error'] is not None
    assert response.json['success_status'] is False
    assert response.status_code == 200


def test_model_categorical_crossentropy_should_return_error():
    model = {
        "optimizer": "adam",
        "loss": "categorical_crossentropy",
        "metrics": [
            {
                "name": "accuracy"
            }
        ],
        "dataset": "MNIST",
        "epochs": "2",
        "layers": [
            {
                "title": "Flatten",
                "hyperparameters": {
                    "input_shape": "(28,28)"
                }
            },
            {
                "title": "Dense",
                "hyperparameters": {
                    "units": "32",
                    "activation": "relu"
                }
            },
            {
                "title": "Dense",
                "hyperparameters": {
                    "units": "64",
                    "activation": "relu"
                }
            },
            {
                "title": "Dense",
                "hyperparameters": {
                    "units": "128",
                    "activation": "softmax"
                }
            }
        ]
    }
    response = app.test_client().post("/test_model", json=model)
    assert response.json['error'] is not None
    assert response.json['success_status'] is False
    assert response.status_code == 200


def test_model_with_conv2d_should_return_ok():
    model = {
        "optimizer": "adam",
        "loss": "sparse_categorical_crossentropy",
        "metrics": [
            {
                "name": "accuracy"
            },
            {
                "name": "mse"
            },
            {
                "name": "sparse_categorical_accuracy"
            }
        ],
        "dataset": "MNIST",
        "epochs": "2",
        "layers": [
            {
                "title": "Input",
                "hyperparameters": {
                    "input_shape": "(28,28,1)",
                    "batch_size": "1"
                }
            },
            {
                "title": "Conv2D",
                "hyperparameters": {
                    "filters": "8",
                    "kernel_size": "(3,3)",
                    "strides": "(1,1)",
                    "padding": "same",
                    "activation": "relu"
                }
            },
            {
                "title": "Flatten",
                "hyperparameters": {
                    "input_shape": "(28,28)"
                }
            },
            {
                "title": "Dense",
                "hyperparameters": {
                    "units": "32",
                    "activation": "relu"
                }
            },
            {
                "title": "Dense",
                "hyperparameters": {
                    "units": "64",
                    "activation": "relu"
                }
            },
            {
                "title": "Dense",
                "hyperparameters": {
                    "units": "128",
                    "activation": "softmax"
                }
            }
        ]
    }
    response = app.test_client().post("/test_model", json=model)
    assert response.json['model'] is not None
    assert response.json['success_status'] is True
    assert response.status_code == 200


def test_model_with_conv2d_should_return_error():
    model = {
        "optimizer": "adam",
        "loss": "sparse_categorical_crossentropy",
        "metrics": [
            {
                "name": "accuracy"
            },
            {
                "name": "mse"
            },
            {
                "name": "sparse_categorical_accuracy"
            }
        ],
        "dataset": "MNIST",
        "epochs": "2",
        "layers": [
            {
                "title": "Input",
                "hyperparameters": {
                    "input_shape": "(28,28)",
                    "batch_size": "1"
                }
            },
            {
                "title": "Conv2D",
                "hyperparameters": {
                    "filters": "8",
                    "kernel_size": "(3,3)",
                    "strides": "(1,1)",
                    "padding": "same",
                    "activation": "relu"
                }
            },
            {
                "title": "Flatten",
                "hyperparameters": {
                    "input_shape": "(28,28)"
                }
            },
            {
                "title": "Dense",
                "hyperparameters": {
                    "units": "32",
                    "activation": "relu"
                }
            },
            {
                "title": "Dense",
                "hyperparameters": {
                    "units": "64",
                    "activation": "relu"
                }
            },
            {
                "title": "Dense",
                "hyperparameters": {
                    "units": "128",
                    "activation": "softmax"
                }
            }
        ]
    }
    response = app.test_client().post("/test_model", json=model)
    assert response.json['error'] is not None
    assert response.json['success_status'] is False
    assert response.status_code == 200
