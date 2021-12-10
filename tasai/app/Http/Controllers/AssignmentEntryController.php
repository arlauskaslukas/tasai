<?php

namespace App\Http\Controllers;

use App\Models\AssignmentEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AssignmentEntryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $array = AssignmentEntry::all();
        //array_push($array,new AssignmentEntry(['id'=>1,'filename'=>'lipsum.py',
        //    'rating'=>10,'assignment_id'=>1,'user_id'=>1]));
        //array_push($array,new AssignmentEntry(['id'=>2,'filename'=>'lipsum.py',
        //    'rating'=>10,'assignment_id'=>1,'user_id'=>2]));
        //array_push($array,new AssignmentEntry(['id'=>3,'filename'=>'lipsum.py',
        //    'rating'=>10,'assignment_id'=>1,'user_id'=>3]));
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
            'filename' => 'required|string',
            'assignment_id' => 'required|numeric',
            'user_id' => 'required|numeric'
        ]);
        $entry = new AssignmentEntry([
            'filename' => $fields['filename'],
            'rating' => 0, 'assignment_id' => $fields['assignment_id'], 'user_id' => $fields['user_id']
        ]);
        if ($entry->save()) return response($entry, 201);
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
        $entry = AssignmentEntry::find($id);
        if ($entry == null) return response('', 404);
        return response($entry, 200);
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
            'filename' => 'required|string',
            'assignment_id' => 'required|numeric',
            'id' => 'required|numeric'
        ]);
        if(($assignmententry=AssignmentEntry::find($fields['id']))!=null)
        {
            if($assignmententry->user_id != auth()->user()->id || auth()->user()->is_admin != 1)
            {
                return response(['message'=>'Unauthenticated'], 401);
            }
            $assignmententry->update([
                'filename' => $request['filename'],
                'rating' => $request['rating'],
                'assignment_id' => $request['assignment_id'],
            ]);
        }
        else{
            return response(
                ['message'=>'Assignment entry with such id was not found'],
                404);
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
        if(($assignmententry = AssignmentEntry::find($fields->id))!=null)
        {
            if($assignmententry->user_id != auth()->user()->id || auth()->user()->is_admin != 1)
            {
                return response(['message'=>'Unauthenticated'], 401);
            }
            AssignmentEntry::destroy($fields->id);
            return response(array("response" => "ok"), 200);
        }
        return response(["message"=>"Assignment entry with such id is not found"], 404);
    }
}
