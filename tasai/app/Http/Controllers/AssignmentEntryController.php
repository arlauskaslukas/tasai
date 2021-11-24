<?php

namespace App\Http\Controllers;

use App\Models\AssignmentEntry;
use Illuminate\Http\Request;

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
        $entry = new AssignmentEntry([
            'filename' => $request['filename'],
            'rating' => $request['rating'], 'assignment_id' => $request['assignment_id'], 'user_id' => $request['user_id']
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
        AssignmentEntry::findOrFail($request['id'])->update([
            'filename' => $request['filename'],
            'rating' => $request['rating'], 'assignment_id' => $request['assignment_id'], 'user_id' => $request['user_id']
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
        AssignmentEntry::destroy($request->id);
        return response(array("response" => "ok"), 200);
    }
}
