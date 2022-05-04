<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProgressTracker;
use Illuminate\Support\Facades\Auth;
use function MongoDB\BSON\toJSON;
use const http\Client\Curl\AUTH_ANY;

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
            'course_id' => 'required|numeric'
        ]);
        $progresstracker = new ProgressTracker(['completed_topics'=>0,
            'course_id'=>$fields['course_id'],
            'user_id'=>auth()->user()->id]);
        if ($progresstracker->save()) {
            return response($progresstracker, 201);
        }
        return response('', 409); //conflict
    }

    public function getPersonalTrackers()
    {
        if(!auth()->user())
        {
            return response('', 404);
        }
        error_log(auth()->user()->id);
        $trackers = ProgressTracker::where('user_id', auth()->user()->id)->get();
        foreach($trackers as $tracker)
        {
            $tracker['course'] = $tracker->course()->get();
        }
        error_log($trackers);
        return response($trackers, 200);
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
        if(($progresstracker=ProgressTracker::find($request->id))!=null)
        {
            if(auth()->user()->id!=$request->user_id)
            {
                return response(['message'=>'Unauthenticated'], 401);
            }
            $progresstracker->update(['completed_topics' => $request->completed_topics]);
            return response(array("response" => "ok"), 200);
        }
        return response(['message'=>'Progress tracker not found'], 404);
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
        if(ProgressTracker::find($request->id)!=null) {
            ProgressTracker::destroy($request->id);
            return response(array("message" => "ok"), 200);
        }
        return response(['message'=>'Progress tracker not found'], 404
        );
    }
}
