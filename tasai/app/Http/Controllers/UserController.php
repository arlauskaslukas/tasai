<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $array = array();
        array_push($array,new User(['id'=>1,'name'=>"dummy1",'email'=>'dummy1@email.com',
            'password'=>'eNcRyPteD', 'is_admin'=>true]));
        array_push($array,new User(['id'=>2,'name'=>"dummy2",'email'=>'dummy2@email.com',
            'password'=>'eNcRyPteD', 'is_admin'=>true]));
        array_push($array,new User(['id'=>3,'name'=>"dummy3",'email'=>'dummy3@email.com',
            'password'=>'eNcRyPteD', 'is_admin'=>true]));
        return response(json_encode($array), 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
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
        $user = new User(['id'=>1,'name'=>"dummy1",'email'=>'dummy1@email.com',
            'password'=>'eNcRyPteD', 'is_admin'=>true]);
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
        $user = new User(['id'=>1,'name'=>"dummy1",'email'=>'dummy1@email.com',
            'password'=>'eNcRyPteD', 'is_admin'=>true]);
        return response($user, 200);
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
    public function destroy(Request $request)
    {
        return response(json_encode(array("response"=>"ok")), 200);
    }
}
