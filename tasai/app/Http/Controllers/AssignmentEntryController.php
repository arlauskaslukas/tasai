<?php

namespace App\Http\Controllers;

use App\Models\AssignmentEntry;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AssignmentEntryController extends Controller
{
    public function index()
    {
        $result = Topic::all();
        foreach($result as $topic)
        {
            $assignments = $topic->assignments()->get();
            foreach($assignments as $assignment)
            {
                $entries = $assignment->assignment_entries()->get();
                $modified_data = array();
                foreach($entries as $entry)
                {
                    $object = array();
                    if($entry["filename"]===null)
                    {
                        $object["type"] = "model";
                        $object["asset"] = $entry["ann_model_id"];
                    }
                    elseif($entry["ann_model_id"]===null)
                    {
                        $object["type"] = "file";
                        $object["asset"] = $entry["filename"];
                    }
                    $username = $entry->user()->get(["name"]);
                    $object["username"] = $username[0]["name"];
                    $object["submitted"] = $entry["created_at"];
                    $object["id"] = $entry["id"];
                    $object["rating"] = $entry["rating"];
                    array_push($modified_data, $object);
                }
                $assignment["entries"] = $modified_data;
            }
            $topic["assignments"] = $assignments;
        }
        return response($result, 200);
    }

    public function retrieveFile(Request $request)
    {
        $request->validate([
            "filename"=>"required"
        ]);
        $file = $request['filename'];
        $storagePath = Storage::disk("public")->path($file);
        $fileContent = file_get_contents($storagePath);

        return \response($fileContent)->withHeaders(
            [
                "Content-Type"=>mime_content_type($storagePath)
            ]
        );
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'assignment_id' => 'required|numeric'
        ]);
        //retrieve user id. assumed non-null value due to sanctum protection
        $uid = auth()->user()->id;
        if(($file=$request->file("file"))!=null)
        {
            $file_extension = $file->clientExtension();
            $name = auth()->user()->name . "_" . time() . "_" . random_int(1000,9999) . ".$file_extension";
            $filename = $file->storePubliclyAs('assignments', $name, ['disk' => 'public']);
            $entry = new AssignmentEntry([
                'filename' => $filename,
                'rating' => 0, 'assignment_id' => $request['assignment_id'], 'user_id' => $uid
            ]);
        }
        elseif($request["model"]!=null)
        {
            $entry = new AssignmentEntry([
                'ann_model_id' => $request["model"],
                'rating' => 0, 'assignment_id' => $request['assignment_id'], 'user_id' => $uid
            ]);
        }
        else
        {
            return response(["message"=>"error"], 400);
        }
        if ($entry->save()) return response($entry, 201);
        return response('', 409);
    }

    public function show($id)
    {
        $entry = AssignmentEntry::find($id);
        if ($entry == null) return response('', 404);
        return response($entry, 200);
    }

    public function update(Request $request)
    {
        $fields = $request->validate([
            'rating' => 'required',
            'id' => 'required|numeric'
        ]);
        if(($assignmententry=AssignmentEntry::find($request['id']))!=null)
        {
            if(auth()->user()->is_admin != 1)
            {
                return response(['message'=>'Unauthenticated'], 401);
            }
            $assignmententry->update([
                'rating' => $request['rating'],
            ]);
        }
        else{
            return response(
                ['message'=>'Assignment entry with such id was not found'],
                404);
        }
        return response(array("message" => "ok"), 200);
    }

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
