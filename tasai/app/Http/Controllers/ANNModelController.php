<?php

namespace App\Http\Controllers;

use App\Models\ANNModel;
use App\Models\Layer;
use App\Models\LayerParameter;
use App\Models\Metric;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ANNModelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $models = ANNModel::all();
        return response($models, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        /*
         * expected structure
         * {
         *      title,
         *      optimizer,
         *      loss,
         *      user_id,
         *      metrics: []
         *      layers: [
         *          {
         *              type,
         *              hyperparameters: {
         *                  "key": "value"
         *                  ...
         *              }
         *          },
         *          ...
         *      ]
         * }
         */
        $fields = $request->validate([
            "title"=>"required",
            "optimizer"=>"required",
            "loss"=>"required",
            "user_id"=>"required",
            "layers"=>"required",
            "metrics"=>"required",
        ]);
        $model = new ANNModel(
            [
                'title'=> $request["title"],
                'optimizer'=>$request["optimizer"],
                'loss'=>$request["loss"],
                'user_id'=>$request["user_id"]
            ]
        );
        if(!$model->save())
        {
            return response(["message"=>"error inserting model"], 409);
        }
        $metrics_insertion_status = $this->insertMetrics($request['metrics'], $model->id);
        if($metrics_insertion_status['message']!="ok")
        {
            return response($metrics_insertion_status, 409);
        }
        $layer_insertion_status = $this->insertChainOfLayers($request["layers"], $model->id);
        if($layer_insertion_status["message"]!="ok")
        {
            return response($layer_insertion_status, 409);
        }
        return response(["message"=>"ok"], 201);
    }

    public function insertMetrics($metrics, $annModelId)
    {
        foreach($metrics as $metric)
        {
            $metricObject = new Metric([
                "name"=>$metric["name"],
                "ann_model_id"=>$annModelId
            ]);

            if(!$metricObject->save())
            {
                return ["message"=>"error saving metrics", "metric"=>$metricObject];
            }
        }
        return ["message"=>"ok"];
    }

    public function insertChainOfLayers($layers, $annModelId)
    {
        $nextId = null;
        //in reverse order
        for($i = count($layers) - 1; $i >= 0; $i--)
        {
            $layer = $layers[$i];
            if($nextId == null)
            {
                $layerObject = new Layer([
                    "type"=>$layer["title"],
                    "ann_model_id"=>$annModelId
                ]);
            }
            else {
                $layerObject = new Layer([
                    "type"=>$layer["title"],
                    "ann_model_id"=>$annModelId,
                    "next_layer_id"=>$nextId
                ]);
            }
            if($layerObject->save())
            {
                $nextId = $layerObject->id;
                $transformed_params = $this->transformpPassedParams($layer["hyperparameters"]);
                $params_status = $this->saveLayerParameters($transformed_params, $nextId);
                if($params_status["message"]!="ok")
                {
                    return $params_status;
                }
            }
            else return ["message"=>"error saving layer", "layer"=>$layerObject];
        }
        return ["message"=>"ok"];
    }

    public function saveLayerParameters($parameters, $layer_id)
    {
        foreach($parameters as $parameter)
        {
            $parameterObject = new LayerParameter([
                "name" => $parameter["name"],
                "type" => $parameter["type"],
                "value" => $parameter["value"],
                "layer_id" => $layer_id
            ]);
            if(!$parameterObject->save())
            {
                return ["message"=>"parameter save failed", "parameter"=>$parameterObject];
            }
        }
        return ["message"=>"ok"];
    }

    public function transformpPassedParams($hyperparameters)
    {
        $transformed_list = array();
        foreach ($hyperparameters as $key => $value)
        {
            $element = [
                "name" => $key,
                "value" => $value,
                "type" => $this->determineType($key)
            ];
            array_push($transformed_list, $element);
        }
        return $transformed_list;
    }
    private function determineType($name)
    {
        switch($name)
        {
            case "kernel_size":
            case "input_shape":
                return "tuple";
            case "batch_size":
            case "units":
            case "strides":
                return "int";
            case "padding":
            case "activation":
            case "filters":
            case "data_format":
                return "string";
            case "rate":
                return "float";
            default:
                return "undefined";
        }
    }

    public function show($id)
    {
        $model = ANNModel::find($id);
        if($model==null) return response(["message"=>"not found"], 404);
        $layers = $model->layers()->get();
        foreach ($layers as $layer)
        {
            $params = $layer->layerParameters()->get();
            $layer["hyperparameters"] = $params;
        }
        $model["layers"] = $layers;
        return response(["message"=>"ok", "model"=>$model], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ANNModel  $aNNModel
     * @return \Illuminate\Http\Response
     */
    public function edit(ANNModel $aNNModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ANNModel  $aNNModel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $fields = $request->validate([
            "optimizer"=>"required|string",
            "loss"=>"required|string",
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ANNModel  $aNNModel
     * @return \Illuminate\Http\Response
     */
    public function destroy(ANNModel $aNNModel)
    {
        //
    }
}
