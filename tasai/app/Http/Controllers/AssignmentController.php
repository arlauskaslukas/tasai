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
        $fields = $request->validate([
            'description' => 'required|string',
            'title' => 'required|string',
            'deadline' => 'required|date',
            'topic_id' => 'required|numeric'
        ]);
        $assignment = new Assignment([
            'description' => $fields['description'],
            'title' => $fields['title'], 'deadline' => $fields['deadline'], 'topic_id' => $fields['topic_id']
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
        $fields = $request->validate([
            'description' => 'required|string',
            'title' => 'required|string',
            'deadline' => 'required|date',
            'topic_id' => 'required|numeric',
            'id' => 'required|numeric'
        ]);
        if(($assignment=Assignment::find($fields['id']))!=null)
        {
            $assignment->update([
                'description' => $fields['description'],
                'title' => $fields['title'],
                'deadline' => $fields['deadline'],
                'topic_id' => $fields['topic_id']
            ]);
        }
        else
        {
            return response(["message"=>"Assignment with such id not found"], 400);
        }

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
        Assignment::destroy($request->id);
        return response(array("response" => "ok"), 200);
    }
}
