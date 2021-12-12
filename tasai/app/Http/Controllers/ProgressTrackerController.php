<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProgressTracker;
use function MongoDB\BSON\toJSON;

class ProgressTrackerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $array = ProgressTracker::all();
        return response($array, 200);
    }


    public function recentJoins()
    {
        $array = ProgressTracker::orderBy('created_at', 'DESC')->take(10)->get();
        foreach($array as $tracker)
        {
            $course = $tracker->course()->get()[0];
            $user = $tracker->user()->get()[0];
            $tracker['user']=$user->name;
            $tracker['course']=$course->title;
            
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
            'course_id' => 'required|numeric',
            'user_id' => 'required|numeric'
        ]);
        $progresstracker = new ProgressTracker(['completed_topics'=>0,
            'course_id'=>$fields['course_id'],
            'user_id'=>$fields['user_id']]);
        if ($progresstracker->save()) {
            return response($progresstracker, 201);
        }
        return response('', 409); //conflict
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $progresstracker = ProgressTracker::find($id);
        if ($progresstracker != null) {
            return response($progresstracker, 200);
        }
        return response('', 404);
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
            'user_id' => 'required|numeric',
            'id' => 'required|numeric',
            'completed_topics' => 'required|numeric'
        ]);
        if(($progresstracker=ProgressTracker::find($fields->id))!=null)
        {
            if(auth()->user()->id!=$fields->user_id)
            {
                return response(['message'=>'Unauthenticated'], 401);
            }
            $progresstracker->update(['completed_topics' => $fields->completed_topics]);
            return response(array("response" => "ok"), 200);
        }
        return response(['message'=>'Progress tracker not found'], 400);
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
            'id' => 'required|numeric',
        ]);
        if(ProgressTracker::find($fields->id)!=null) {
            ProgressTracker::destroy($fields->id);
            return response(array("message" => "ok"), 200);
        }
        return response(['message'=>'Progress tracker not found'], 400);
    }
}
