<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Assignment;

class AssignmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $array = Assignment::all();
        //array_push($array,
        //new Assigment(['id'=>1,'description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
        //    'title'=>'Lorem ipsum', 'deadline'=>'2021-10-06','topic_id'=>1])
        //);
        //array_push($array,
        //    new Assigment(['id'=>2,'description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
        //        'title'=>'Lorem ipsum', 'deadline'=>'2021-10-06','topic_id'=>1])
        //);
        //array_push($array,
        //    new Assigment(['id'=>3,'description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
        //        'title'=>'Lorem ipsum', 'deadline'=>'2021-10-06','topic_id'=>1])
        //);
        return response(json_encode($array), 200);
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
        $assignment = new Assignment([
            'description' => $request['description'],
            'title' => $request['title'], 'deadline' => $request['deadline'], 'topic_id' => $request['topic_id'], 'course_id' => $request['course_id']
        ]);
        if ($assignment->save()) return response($assignment, 201);
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
        $assignment = Assignment::find($id);
        if ($assignment == null) return response('', 404);
        return response($assignment, 200);
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
        Assignment::findOrFail($request['id'])->update([
            'description' => $request['description'],
            'title' => $request['title'], 'deadline' => $request['deadline'], 'topic_id' => $request['topic_id'], 'course_id' => $request['course_id']
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
        Assignment::destroy($id);
        return response(json_encode(array("response" => "ok")), 200);
    }
}
