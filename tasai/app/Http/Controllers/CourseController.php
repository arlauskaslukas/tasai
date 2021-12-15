<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\Foreach_;

use function PHPUnit\Framework\isEmpty;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $array = Course::all();
        //array_push($array,new Course(['id'=>1,'starts_at'=>"2021-10-06",'title'=>'lorem ipsum',
        //    'short_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
        //    'long_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
        //    'duration'=>10,'cost'=>'90']));
        //array_push($array,new Course(['id'=>2,'starts_at'=>"2021-10-06",'title'=>'lorem ipsum',
        //    'short_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
        //    'long_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
        //    'duration'=>10,'cost'=>'90']));
        //array_push($array,new Course(['id'=>3,'starts_at'=>"2021-10-06",'title'=>'lorem ipsum',
        //    'short_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
        //    'long_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
        //    'duration'=>10,'cost'=>'90']));
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
        $fields = $request->validate(
            [
                'starts_at' => 'required|date',
                'title' => 'required|string',
                'short_description' => 'required|string',
                'long_description' => 'required|string',
                'duration' => 'required|numeric|min:1',
                'cost' => 'required|numeric|min:0'
            ]
        );
        $course = new Course([
            'starts_at' => $fields['starts_at'], 'title' => $fields['title'],
            'short_description' => $fields['short_description'],
            'long_description' => $fields['long_description'],
            'duration' => $fields['duration'], 'cost' => $fields['cost']
        ]);
        if ($course->save()) return response($course, 201);
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
        $course = Course::find($id);
        if ($course == null) return response('', 404);
        //$course =new Course(['id'=>1,'starts_at'=>"2021-10-06",'title'=>'lorem ipsum',
        //    'short_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
        //    'long_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
        //    'duration'=>10,'cost'=>'90']);
        return response($course, 200);
    }

    public function course_topics($course_id)
    {
        $course = Course::find($course_id);
        if ($course == null) return response('', 404);
        $topics = $course->topics()->get();
        $course['topics'] = $topics;
        return response($course, 200);
    }

    public function top_courses()
    {
        $courses = Course::all()->take(3);
        return response($courses, 200);
    }

    public function course_assignments($course_id)
    {
        $course = Course::find($course_id);
        if ($course == null) return response('', 404);
        $topics = $course->topics()->get();
        foreach ($topics as $topic) {
            $topic['assignments'] = $topic->assignments()->get();
        }
        $course['topics'] = $topics;
        return response($course, 200);
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
        $fields = $request->validate(
            [
                'starts_at' => 'required|date',
                'title' => 'required|string',
                'short_description' => 'required|string',
                'long_description' => 'required|string',
                'duration' => 'required|numeric|min:1',
                'cost' => 'required|numeric|min:0',
                'id'=>'required|numeric'
            ]
        );
        if(($course=Course::find($request->id))!=null)
        {
            $course->update(['starts_at' => $request['starts_at'], 'title' => $request['title'],
                'short_description' => $request['short_description'],
                'long_description' => $request['long_description'],
                'duration' => 10, 'cost' => $request['cost']
            ]);
            return response(array("message" => "ok"), 200);
        }
        return response(["message" => "Course with such id not found"], 404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        error_log($id);
        if(Course::find($id)!=null)
        {
            Course::destroy($id);
            return response(array("message" => "ok"), 200);
        }
        return response(['message'=>"Course with such id was not found"], 404);
    }
}
