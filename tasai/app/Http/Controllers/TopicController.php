<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $array = Topic::all();
        //array_push($array,new Topic(['id'=>1,'title'=>'lorem ipsum','topic_order'=>1,
        //    'short_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
        //    'theory'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
        //    'course_id'=>1]));
        //array_push($array,new Topic(['id'=>2,'title'=>'lorem ipsum','topic_order'=>2,
        //    'short_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
        //    'theory'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
        //    'course_id'=>1]));
        //array_push($array,new Topic(['id'=>3, 'title'=>'lorem ipsum','topic_order'=>3,
        //    'short_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
        //    'theory'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
        //    'course_id'=>1]));
        //
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
        $topic = new Topic([
            'title' => $request['title'], 'topic_order' => $request['topic_order'],
            'short_description' => $request['short_description'],
            'theory' => $request['long_description'],
            'course_id' => $request['course_id']
        ]);
        if ($topic->save()) return response($topic, 201);
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
        $topic = Topic::find($id);
        if ($topic == null) return response('', 404);
        return response($topic, 200);
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
        Topic::findOrFail($request['id'])->update([
            'title' => $request['title'], 'topic_order' => $request['topic_order'],
            'short_description' => $request['short_description'],
            'theory' => $request['long_description'],
            'course_id' => $request['course_id']
        ]);
        return response(json_encode(array("response" => "ok")), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Topic::destroy($id);
        return response(json_encode(array("response" => "ok")), 200);
    }
}
