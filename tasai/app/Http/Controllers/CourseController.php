<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $array = array();
        array_push($array,new Course(['id'=>1,'starts_at'=>"2021-10-06",'title'=>'lorem ipsum',
            'short_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
            'long_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
            'duration'=>10,'cost'=>'90']));
        array_push($array,new Course(['id'=>2,'starts_at'=>"2021-10-06",'title'=>'lorem ipsum',
            'short_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
            'long_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
            'duration'=>10,'cost'=>'90']));
        array_push($array,new Course(['id'=>3,'starts_at'=>"2021-10-06",'title'=>'lorem ipsum',
            'short_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
            'long_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
            'duration'=>10,'cost'=>'90']));
        return response(json_encode($array), 200);
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
        $course =new Course(['id'=>1,'starts_at'=>"2021-10-06",'title'=>'lorem ipsum',
            'short_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
            'long_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
            'duration'=>10,'cost'=>'90']);
        return response($course, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $course =new Course(['id'=>1,'starts_at'=>"2021-10-06",'title'=>'lorem ipsum',
            'short_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
            'long_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
            'duration'=>10,'cost'=>'90']);
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
        return response(json_encode(array("response"=>"ok")), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return response(json_encode(array("response"=>"ok")), 200);
    }
}
