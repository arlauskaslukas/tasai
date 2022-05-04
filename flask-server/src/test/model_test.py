from tensorflow import keras
from keras import layers
from keras import losses
from keras import datasets

if __name__ == "__main__":
    (x_train, y_train), (x_test, y_test) = datasets.mnist.load_data()
    train_images = x_train / 255.0

    test_images = x_test / 255.0
    model = keras.Sequential([
        layers.Flatten(input_shape=(28, 28)),
        layers.Dense(128, activation='relu'),
        layers.Dense(10)
    ])
    model.compile(optimizer="adam", metrics=["accuracy"], loss=losses.get("sparse_categorical_crossentropy"))
    model.fit(train_images, y_train, epochs=10)