<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Faker\Core\File;
use Illuminate\Http\Request;

class MediaController extends Controller
{

    public function index()
    {
        $array = Media::all();

        return response($array, 200);
    }
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

    public function show($id)
    {
        $media = Media::find($id);
        if ($media == null) return response('', 404);
        return response($media, 200);
    }

    public function update(Request $request)
    {
        Media::findOrFail($request->id)->update([
            'filename' => $request->filename,
            'topic_id' => $request->topic_id
        ]);
        return response(array("response" => "ok"), 200);
    }

    public function destroy(Request $request)
    {
        Media::destroy($request->id);
        return response(array("response" => "ok"), 200);
    }

}
