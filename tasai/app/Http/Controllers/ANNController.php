<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ANNController extends Controller
{
    //
    public function parseModelFromJson(Request $request)
    {
        /* General modelio json struktura
         * optimizer: String
         * loss function: String
         * metrics: array of strings
         * layers:
         * title: String
         * hyperparameters: json object
         */
        /*
         * General algorithm:
         * Parse layers
         * Put everything in Sequential model
         * Append the model.compile() with optimizer, loss, and metrics
         * Prepend keras dependencies
         */
        $layers = "[";
        foreach($request->layers as $layer)
        {
            $data = $this->parseLayer($layer);
            $layers = $layers . $data;
        }
        $layers = $layers."]";
        $model = $this->addDependencies()."model = keras.Sequential(".$layers.")\n\n".$this->addCompile($request);
        return response(["model"=>$model], 200);
    }
    private function parseLayer($layer)
    {
        if($layer["title"] == "Input")
        {
            $shape = $layer["hyperparameters"]["input_shape"];
            $batch_size = $layer["hyperparameters"]["batch_size"];
            return "layers.Input(shape=($shape), batch_size=$batch_size)";
        }
        elseif($layer['title'] == "Dense")
        {
            $activation = $layer["hyperparameters"]["activation"];
            $units = $layer["hyperparameters"]["units"];
            return "layers.Dense($units, activation='$activation'),\n";
        }
    }
    private function addCompile($modeldata)
    {
        $optimizer = $modeldata["optimizer"];
        $loss = $modeldata->loss;
        $metrics = $modeldata->metrics;
        $parsedmetrics = "[";
        foreach($metrics as $metric)
        {
            $parsedmetrics = $parsedmetrics . "'$metric',";
        }
        $parsedmetrics = $parsedmetrics."]";
        return "model.compile(optimizer='$optimizer', loss='$loss' metrics=$parsedmetrics)";
    }
    private function addDependencies() {
        return "from tensorflow import keras\n".
            "from tensorflow.keras import layers\n\n";
    }
}
