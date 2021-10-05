<?php

namespace App\Http\Controllers;

use App\Models\TimetableEntry;
use Illuminate\Http\Request;

class TimetableEntryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $array = array();
        array_push($array,new TimetableEntry(['id'=>1,'lesson_time'=>"2021-10-06 09:00",'entry_title'=>'lorem ipsum',
            'link'=>'http://lorem.ipsum',
            'long_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
            'course_id'=>1,'topic_id'=>1]));
        array_push($array,new TimetableEntry(['id'=>2,'lesson_time'=>"2021-10-06 09:00",'entry_title'=>'lorem ipsum',
            'link'=>'http://lorem.ipsum',
            'long_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
            'course_id'=>1,'topic_id'=>1]));
        array_push($array,new TimetableEntry(['id'=>3,'lesson_time'=>"2021-10-06 09:00",'entry_title'=>'lorem ipsum',
            'link'=>'http://lorem.ipsum',
            'long_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
            'course_id'=>1,'topic_id'=>1]));
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
         $entry =new TimetableEntry(['id'=>1,'lesson_time'=>"2021-10-06 09:00",'entry_title'=>'lorem ipsum',
             'link'=>'http://lorem.ipsum',
             'long_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
             'course_id'=>1,'topic_id'=>1]);
         return response($entry, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $entry =new TimetableEntry(['id'=>1,'lesson_time'=>"2021-10-06 09:00",'entry_title'=>'lorem ipsum',
            'link'=>'http://lorem.ipsum',
            'long_description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat vulputate faucibus. Donec porttitor magna felis, nec tincidunt sem blandit.',
            'course_id'=>1,'topic_id'=>1]);
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
