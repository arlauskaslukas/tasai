<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Faker\Core\File;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $array = Media::all();
        //array_push($array,new Media(['id'=>1,'filename'=>'lipsum.jpg',
        //    'topic_id'=>1]));
        //array_push($array,new Media(['id'=>2,'filename'=>'lipsum2.jpg',
        //    'topic_id'=>2]));
        //array_push($array,new Media(['id'=>3,'filename'=>'lipsum3.jpg',
        //    'topic_id'=>3]));
        return response($array, 200);
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
        $request->validate([
            'file'=>'required',
            'topic_id'=>'required'
        ]);
        $filename = $request->file('file')->store('CourseMedia');
        $media = new Media([
            'filename' => $filename,
            'topic_id' => $request->topic_id
        ]);
        if ($media->save()) return response($media, 201);
        return response('', 409);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $media = Media::find($id);
        if ($media == null) return response('', 404);
        return response($media, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        Media::findOrFail($request->id)->update([
            'filename' => $request->filename,
            'topic_id' => $request->topic_id
        ]);
        return response(array("response" => "ok"), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        Media::destroy($request->id);
        return response(array("response" => "ok"), 200);
    }
}
