<?php

namespace App\Http\Controllers;

use App\Models\Course;
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
            'topic_order' => 'required|numeric',
            'short_description' => 'required|string',
            'theory' => 'required|string',
            'course_id' => 'required|numeric'
        ]);
        $topic = new Topic([
            'title' => $request['title'], 'topic_order' => $request['topic_order'],
            'short_description' => $request['short_description'],
            'theory' => $request['theory'],
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

    public function topic_assignments($topic_id)
    {
        $topic = Topic::find($topic_id);
        if($topic==null) return response('',404);
        $topic['assignments'] = $topic->assignments()->get();
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

    //@param int id - course id
    public function getAvailableTopicOrder(Request $request)
    {
        $course = Course::where("id",$request->id)->get()[0];
        $topics = $course->topics()->get();
        $count = count($topics);
        return $count;
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
            'topic_order' => 'required|numeric',
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
        Topic::destroy($request->id);
        return response(array("message" => "ok"), 200);
    }
}
