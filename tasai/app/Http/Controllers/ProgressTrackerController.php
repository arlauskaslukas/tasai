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
        $progresstracker->completed_topics = 0;
        $progresstracker->course_id = $request->course_id;
        $progresstracker->user_id = $request->user_id;
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
    public function update(Request $request, $id)
    {
        if ($request->completed_topics == null) return response('', 404);
        ProgressTracker::where('id', $id)->update(['completed_topics' => $request->completed_topics]);
        return response(json_encode(array("response" => "ok")), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        ProgressTracker::destroy($request->id);
        return response(json_encode(array("response" => "ok")), 200);
    }
}
