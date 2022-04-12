<?php

namespace App\Http\Controllers;

use App\Models\ANNModel;
use Illuminate\Http\Request;

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
    public function store($title, $optimizer, $loss, $user_id)
    {
        $model = new ANNModel(
            [
                'title'=> $title,
                'optimizer'=>$optimizer,
                'loss'=>$loss,
                'user_id'=>$user_id
            ]
        );
        if($model->save()) return "ok";
        return "fail";
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ANNModel  $aNNModel
     * @return \Illuminate\Http\Response
     */
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
