<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\TimetableEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Spatie\CalendarLinks\Link;
use Symfony\Component\ErrorHandler\Debug;

class TimetableEntryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $array = TimetableEntry::all();
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
        $entry = new TimetableEntry([
            'lesson_time' => $request['lesson_time'],'entry_title' => $request['entry_title'],
            'link' => $request['link'],
            'long_description' => $request['long_description'],
            'course_id' => $request['course_id'], 'topic_id' => $request['topic_id']
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
        $entry = TimetableEntry::find($id);
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
        TimetableEntry::findOrFail($request->id)->update([
            'lesson_time' => $request['lesson_time'],'entry_title' => $request['entry_title'],
            'link' => $request['link'],
            'long_description' => $request['long_description'],
            'course_id' => $request['course_id'], 'topic_id' => $request['topic_id']
        ]);
        return response(array("response" => "ok"), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
        TimetableEntry::destroy($id);
        return response(array("response" => "ok"), 200);
    }
    public function export_course_event($id)
    {
        $entry = TimetableEntry::findOrFail($id);
        $from = \DateTime::createFromFormat("Y-m-d H:i:s", $entry["lesson_time"]);
        $to = $from->add(new \DateInterval('PT1H'));
        $link = Link::create($entry["entry_title"],$from, $to)->description("Prisijungimas prie pamokos: ". $entry["link"]);
        return response(array("response"=>"ok", "uri"=>$link->ics()),200);
    }
    public function get_course_timetable($id) {
        $entries = TimetableEntry::where('course_id', $id)->get();
        return response($entries, 200);
    }
    public function courses_timetables(Request $request)
    {
        $array = Course::all();
        foreach($array as $course)
        {
            $course['timetable'] = $course->timetables()->get();
        }
        return response($array, 200);
    }
}
