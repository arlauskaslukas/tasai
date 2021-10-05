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
        $array = array();
        array_push($array, new ProgressTracker(["id"=>1,"completed_topics"=>2, "user_id"=>1,"course_id"=>2]));
        array_push($array, new ProgressTracker(["id"=>2,"completed_topics"=>2, "user_id"=>2,"course_id"=>2]));
        array_push($array, new ProgressTracker(["id"=>3,"completed_topics"=>2, "user_id"=>3,"course_id"=>2]));
        return response(json_encode($array), 200);
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
        $progresstracker = new ProgressTracker();
        $progresstracker->id=1;
        $progresstracker->completed_topics = 0;
        $progresstracker->course_id = $request->course_id;
        $progresstracker->user_id = $request->user_id;
        //$progresstracker->save();
        return response($progresstracker, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //$progresstracker = ProgressTracker::findOrFail($id);
        $progresstracker=new ProgressTracker(["id"=>1,"completed_topics"=>2, "user_id"=>1,"course_id"=>2]);
        return response($progresstracker, 200);
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
        //ProgressTracker::where('id', $id)->update(['completed_topics'=>$request->completed_topics]);
        return response(json_encode(array("response"=>"ok")), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy()
    {
        //ProgressTracker::destroy($id);
        return response(json_encode(array("response"=>"ok")), 200);
    }
}
