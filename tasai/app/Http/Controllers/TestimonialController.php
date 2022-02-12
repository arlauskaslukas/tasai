<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TestimonialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $testimonials = Testimonial::all();
        foreach ($testimonials as $testimonial)
        {
            $testimonial["user"] = $testimonial->user()->get(["name"])[0];
            $testimonial["course"] = $testimonial->course()->get(["title"])[0];
        }
        return response($testimonials, 200);
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
        error_log(Auth::user()->id);
        $fields = $request->validate([
            "testimonial" => "required|string",
            "rating" => "required|numeric",
            "course_id" => "required|numeric"
        ]);
        $testimonial = new Testimonial(["testimonial"=>$fields["testimonial"],
            "rating"=>$fields["rating"],
            "user_id"=>\auth()->user()->id,
            "course_id"=>$fields["course_id"]]);
        if($testimonial->save()) return response($testimonial, \Illuminate\Http\Response::HTTP_CREATED);
        return response('', \Illuminate\Http\Response::HTTP_CONFLICT);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Testimonial  $testimonial
     * @return \Illuminate\Http\Response
     */
    public function show(Testimonial $testimonial)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Testimonial  $testimonial
     * @return \Illuminate\Http\Response
     */
    public function edit(Testimonial $testimonial)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Testimonial  $testimonial
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Testimonial $testimonial)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Testimonial  $testimonial
     * @return \Illuminate\Http\Response
     */
    public function destroy(Testimonial $testimonial)
    {
        //
    }
}
