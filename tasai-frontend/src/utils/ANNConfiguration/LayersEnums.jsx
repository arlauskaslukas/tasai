export default class LayersEnums {
    constructor(){};
    static Layers = [
        {
            layerCatId: 0,
            layerCat: 'Pagrindiniai',
            layers: [
                "Input", 
                "Dense", 
                "Activation", 
                "Embedding", 
                "Masking", 
                "Lambda"
            ]
        },
        {
            layerCatId: 1,
            layerCat: 'Konvoliuciniai',
            layers: [
                "Conv1D",
                "Conv2D",
                "Conv3D",
                "SeparableConv1D",
                "SeparableConv2D",
                "DepthwiseConv2D",
                "Conv2DTranspose",
                "Conv3DTranspose"
            ]
        },
        {
            layerCatId: 2,
            layerCat: 'Telkimo',
            layers: [
                "MaxPooling1D",
                "MaxPooling2D",
                "MaxPooling3D",
                "AveragePooling1D",
                "AveragePooling2D",
                "AveragePooling3D",
                "GlobalMaxPooling1D",
                "GlobalMaxPooling2D",
                "GlobalMaxPooling3D",
                "GlobalAveragePooling1D",
                "GlobalAveragePooling2D",
                "GlobalAveragePooling3D"
            ]
        },
        {
            layerCatId: 3,
            layerCat: 'Rekurentiniai',
            layers: [
                "LSTM",
                "GRU",
                "SimpleRNN",
                "TimeDistributed",
                "Bidirectional",
                "ConvLSTM1D",
                "ConvLSTM2D",
                "ConvLSTM3D",
            ]
        },
        {
            layerCatId: 4,
            layerCat: 'Normalizacijos',
            layers: [
                "BatchNormalization",
                "LayerNormalization",
            ]
        },
        {
            layerCatId: 5,
            layerCat: 'Reguliarizacijos',
            layers: [
                "Dropout",
                "SpatialDropout1D",
                "SpatialDropout2D",
                "SpatialDropout3D",
                "GaussianDropout",
                "GaussianNoise",
                "ActivityRegularization",
                "AlphaDropout",
            ]
        },
        {
            layerCatId: 6,
            layerCat: 'Dėmesio',
            layers: [
                "MultiHeadAttention",
                "AdditiveAttention",
            ]
        },
        {
            layerCatId: 7,
            layerCat: 'Performavimo',
            layers: [
                "Reshape",
                "Flatten",
                "RepeatVector",
                "Permute",
                "Cropping1D",
                "Cropping2D",
                "Cropping3D",
                "UpSampling1D",
                "UpSampling2D",
                "UpSampling3D",
                "ZeroPadding1D",
                "ZeroPadding2D",
                "ZeroPadding3D"
            ]
        },
        {
            layerCatId: 8,
            layerCat: 'Sąlajos',
            layers: [
                "Concatenate",
                "Average",
                "Maximum",
                "Minimum",
                "Add",
                "Subtract",
                "Multiply",
                "Dot",
            ]
        },
        {
            layerCatId: 9,
            layerCat: 'Lokaliai sujungti',
            layers: [
                "LocallyConnected1D",
                "LocallyConnected2D",
            ]
        },
        {
            layerCatId: 10,
            layerCat: 'Aktyvacijos',
            layers: [
                "ReLU",
                "Softmax",
                "LeakyReLU",
                "PReLU",
                "ELU",
                "ThresholdedReLU",
            ]
        },
    ]
}