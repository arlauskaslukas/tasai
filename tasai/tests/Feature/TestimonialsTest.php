<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class TestimonialsTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_testimonials_controller_index_should_return_ok()
    {
        $preparedCourseTestObject = DB::table('courses')->insertGetId([
            'starts_at' => '2022-05-01',
            'title' => 'test',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20'
        ]);
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $this->post("/api/testimonials",[
            "testimonial"=>"test",
            "rating"=>"5",
            "course_id" => $preparedCourseTestObject
        ], [
            "Authorization" => "Bearer ". $auth["token"]
        ]);
        $this->get("/api/testimonials")->assertStatus(200);
        DB::table("testimonials")->delete();
        DB::table('courses')->delete();
    }
    public function test_testimonials_store_should_return_redirect()
    {
        //data is irrelevant here
        $this->post("/api/testimonials",[])->assertStatus(302);
    }
    public function test_testimonials_controller_store_with_user_auth_should_return_created()
    {
        $preparedCourseTestObject = DB::table('courses')->insertGetId([
            'starts_at' => '2022-05-01',
            'title' => 'test',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20'
        ]);
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $response = $this->post("/api/testimonials",[
            "testimonial"=>"test",
            "rating"=>"5",
            "course_id" => $preparedCourseTestObject
        ], [
            "Authorization" => "Bearer ". $auth["token"]
        ]);
        $response->assertStatus(201);
        DB::table("testimonials")->delete();
        DB::table('courses')->delete();
    }
}
