<?php

namespace App\Http\Controllers;

use App\Models\AssignmentEntry;
use App\Models\AttendanceEntry;
use Illuminate\Http\Request;

class AttendanceEntryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $array = AttendanceEntry::all();
        foreach ($array as $element)
        {
            $user = $element->user()->get(['name']);
            $topic = $element->topic()->get(['title']);
            $element['topic'] = $topic;
            $element['user'] = $user;
        }
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
        $entry = new AttendanceEntry(
            [
                'is_attending' => $request['is_attending'],
                'user_id' => $request['user_id'],
                'topic_id' => $request['topic_id']
            ]
        );
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
        $entry = AttendanceEntry::find($id);
        if ($entry == null) return response('', 404);
        $user = $entry->user()->get(['name']);
        $topic = $entry->topic()->get(['title']);
        $entry['topic'] = $topic;
        $entry['user'] = $user;
        return response($entry, 201);
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
        AttendanceEntry::findOrFail($request['id'])->update(
            [
                'is_attending' => $request['is_attending'],
                'user_id' => $request['user_id'],
                'topic_id' => $request['topic_id']
            ]
        );
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
        AttendanceEntry::destroy($request->id);
        return response(array("response" => "ok"), 200);
    }
}
