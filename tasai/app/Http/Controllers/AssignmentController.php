<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Assignment;

class AssignmentController extends Controller
{
    public function index()
    {
        $array = Assignment::all();
        foreach($array as $assignment)
        {
            $topic = $assignment->topic()->get();
            $tracker['topic']=$topic;
        }
        return response($array, 200);
    }
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

    public function show($id)
    {
        $assignment = Assignment::find($id);
        if ($assignment == null) return response('', 404);
        return response($assignment, 200);
    }
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

    public function destroy(Request $request)
    {
        Assignment::destroy($request->id);
        return response(array("message" => "ok"), 200);
    }
}
