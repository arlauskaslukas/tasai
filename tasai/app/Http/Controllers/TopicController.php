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
        $fields = $request->validate([
            'title' => 'required|string',
            'topic_order' => 'required|string',
            'short_description' => 'required|string',
            'theory' => 'required|string',
            'course_id' => 'required|numeric'
        ]);
        $topic = new Topic([
            'title' => $fields['title'], 'topic_order' => $fields['topic_order'],
            'short_description' => $fields['short_description'],
            'theory' => $fields['theory'],
            'course_id' => $fields['course_id']
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
        $fields = $request->validate([
            'title' => 'required|string',
            'topic_order' => 'required|string',
            'short_description' => 'required|string',
            'theory' => 'required|string',
            'course_id' => 'required|numeric',
            'id' => 'required|numeric'
        ]);
        if(($topic=Topic::find($fields['id']))!=null)
        {
            $topic->update([
                'title' => $fields['title'], 'topic_order' => $fields['topic_order'],
                'short_description' => $fields['short_description'],
                'theory' => $fields['theory'],
                'course_id' => $fields['course_id']
            ]);
        }
        else
        {
            return response(["message"=>"Topic with such id not found"], 400);
        }

        return response(array("message" => "ok"), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $fields = $request->validate([
           'id' => 'required|numeric'
        ]);
        if(Topic::find($fields['id'])!=null) {
            Topic::destroy($request->id);
            return response(array("message" => "ok"), 200);
        }
        return response(['message'=>'Topic with such id was not found'], 404);
    }
}
