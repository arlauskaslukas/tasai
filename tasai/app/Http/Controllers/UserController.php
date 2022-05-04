<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Course;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use function PHPUnit\Framework\isEmpty;
use const http\Client\Curl\AUTH_ANY;

class UserController extends Controller
{

    public function index()
    {
        $array = User::all();
        return response($array, 200);
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
        $progresstracker = $user->progress_trackers()->where('course_id', $course_id)->first();
        if (!$progresstracker) {
            $user['progress'] = "This user has not enrolled in the course with specified id";
            return response($user, 200);
        } else {
            $progresstracker['course_info'] = $progresstracker->course()->get();
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
        $user->save();
        return response($user, 201);
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

    public function update(Request $request)
    {
        $user = User::find($request->id);
        if ($user == null) return response('', 404);
        if(!auth::user() || auth::user()->id!=$request['id'])
            return response(array("message"=>"Unauthorized"), 401);
        $user->update(['name' => $request->name, 'email' => $request->email]);
        return response(array("response" => "ok"), 200);
    }

    public function destroy(Request $request)
    {
        $user = User::find($request->id);
        if ($user == null) return response('', 404);
        $user->delete();
        return response(array("response" => "ok"), 200);
    }

    public function getBlockedUsers()
    {
        $array = User::onlyTrashed()->get();
        return response($array, 200);
    }

    public function restoreBlocked(Request $request)
    {
        $fields = $request->validate([
            'id'=>'required|numeric'
        ]);

        User::withTrashed()->find($fields['id'])->restore();
        return response(array("response" => "ok"), 200);
    }
    public function getCurrentUserData()
    {
        $user = Auth::user();
        return response($user, 200);
    }
}
