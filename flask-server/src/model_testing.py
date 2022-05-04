from tensorflow import keras
from keras import layers
from keras import losses
from keras import datasets
import numpy as np


def build_model(layers, optimizer, metrics, loss, dataset):
    dataset_object = detect_dataset(dataset)
    if dataset_object is None:
        return "Error: the requested dataset has not been found"
    # logic for constructing the model
    (x_train, y_train), (x_test, y_test) = dataset_object.load_data()
    model = keras.Sequential([])
    for layer in layers:
        model = add_layer(model, layer)
    #compilation
    model.compile(optimizer=optimizer, metrics=[x['name'] for x in metrics], loss=losses.get(loss))
    try:
        history = model.fit(x_train, y_train, epochs=10)
        return history.history
    except Exception as e:
        return f"Error: failure to run model, check your model structure." \
               "One of problems might be not fitting input shapes. Input shape " \
               f"for this dataset is {x_train.shape}." \
               f"Developer information: {e}" \
               f"Received layer information {layers}"


def detect_dataset(dataset):
    if dataset == "BOSTON":
        return datasets.boston_housing
    elif dataset == "CIFAR10":
        return datasets.cifar10
    elif dataset == "CIFAR100":
        return datasets.cifar100
    elif dataset == "FASHION":
        return datasets.fashion_mnist
    elif dataset == "MNIST":
        return datasets.mnist
    return None


def add_layer(model, layer_object):
    if layer_object['title'] == 'Input':
        hyperparams = layer_object['hyperparameters']
        print(eval(hyperparams['input_shape']))
        model.add(layers.Input(input_shape=eval(hyperparams['input_shape']), batch_size=eval(hyperparams['batch_size'])))
    elif layer_object['title'] == 'Dense':
        hyperparams = layer_object['hyperparameters']
        model.add(layers.Dense(int(hyperparams['units']), activation=hyperparams['activation']))
    elif layer_object['title'] == 'Flatten':
        hyperparams = layer_object['hyperparameters']
        model.add(layers.Flatten(input_shape=eval(hyperparams['input_shape'])))
    elif layer_object['title'] == 'Conv2D':
        hyperparams = layer_object['hyperparameters']
        filters = hyperparams['filters']
        kernel_size = hyperparams['kernel_size']
        strides = hyperparams['strides']
        padding = hyperparams['padding']
        activation = hyperparams['activation']
        model.add(layers.Conv2D(filters=int(filters), kernel_size=eval(kernel_size), strides=eval(strides), padding=padding, activation=activation))
    return model