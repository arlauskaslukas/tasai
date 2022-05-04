<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use http\Client\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TestimonialController extends Controller
{
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

    public function store(Request $request)
    {
        $fields = $request->validate([
            "testimonial" => "required|string",
            "rating" => "required|numeric",
            "course_id" => "required|numeric"
        ]);
        $testimonial = new Testimonial(["testimonial"=>$fields["testimonial"],
            "rating"=>$fields["rating"],
            "user_id"=>\auth()->user()->id,
            "course_id"=>$fields["course_id"]]);
        $testimonial->save();
        return response($testimonial, \Illuminate\Http\Response::HTTP_CREATED);
    }
}
