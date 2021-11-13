<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Course;

use function PHPUnit\Framework\isEmpty;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $array = User::all();
        //array_push($array,new User(['id'=>1,'name'=>"dummy1",'email'=>'dummy1@email.com',
        //    'password'=>'eNcRyPteD', 'is_admin'=>true]));
        //array_push($array,new User(['id'=>2,'name'=>"dummy2",'email'=>'dummy2@email.com',
        //    'password'=>'eNcRyPteD', 'is_admin'=>true]));
        //array_push($array,new User(['id'=>3,'name'=>"dummy3",'email'=>'dummy3@email.com',
        //    'password'=>'eNcRyPteD', 'is_admin'=>true]));
        return response($array, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
    }

    public function progress_trackers($user_id)
    {
        $user = User::find($user_id);
        if ($user == null) return response('', 404);
        $progresstrackers = $user->progress_trackers()->get();
        foreach ($progresstrackers as $tracker) {
            $tracker['course_info'] = $tracker->course()->get();
        }
        $user['progress'] = $progresstrackers;
        return response($user, 200);
    }

    public function course_progress($user_id, $course_id)
    {
        $user = User::find($user_id);
        if ($user == null) return response('', 404);
        $progresstracker = $user->progress_trackers()->where('course_id', $course_id)->get();
        if ($progresstracker) {
            $user['progress'] = "This user has not enrolled in the course with specified id";
            return response($user, 200);
        } else {
            $progresstracker[0]['course_info'] = $progresstracker[0]->course()->get();
            $user['progress'] = $progresstracker;
        }
        return response($user, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = new User([
            'name' => $request->name, 'email' => $request->email,
            'password' => $request->password, 'is_admin' => '0'
        ]);
        if ($user->save()) {
            return response($user, 201);
        }
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
        $user = User::find($id);
        if ($user != null) return response($user, 200);
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
        $user = User::find($request->id);
        if ($user == null) return response('', 404);
        $user->update(['name' => $request->name, 'email' => $request->email]);
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
        $user = User::find($request->id);
        if ($user == null) return response('', 404);
        $user->delete();
        return response(json_encode(array("response" => "ok")), 200);
    }
}
