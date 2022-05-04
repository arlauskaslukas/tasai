<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class CourseTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_courses_controller_index_should_return_ok()
    {
        $response = $this->get('/api/courses');

        $response->assertStatus(200);
    }

    public function test_courses_controller_show_should_return_not_found()
    {
        $response = $this->get("/api/courses/999");
        $response->assertStatus(404);
    }

    public function test_courses_controller_show_should_return_ok()
    {
        $preparedTestObject = DB::table('courses')->insertGetId([
            'starts_at' => '2022-05-01',
            'title' => 'test',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20'
        ]);
        $response = $this->get("/api/courses/".$preparedTestObject);
        $response->assertStatus(200);
        DB::table('courses')->delete();
    }

    public function test_courses_controller_store_should_return_unauthenticated()
    {
        $response = $this->post("/api/courses", [
            'starts_at' => '2022-05-01',
            'title' => 'test',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20']);
        $response->assertStatus(302);
    }

    public function test_courses_controller_top_courses_should_return_ok()
    {
        $this->get("/api/topcourses")->assertStatus(200);
    }

    public function test_courses_controller_topics_should_return_ok()
    {
        $preparedTestObject = DB::table('courses')->insertGetId([
            'starts_at' => '2022-05-01',
            'title' => 'test',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20'
        ]);
        $response = $this->get("/api/courses/$preparedTestObject/topics");
        $response->assertStatus(200);
        DB::table('courses')->delete();
    }

    public function test_courses_controller_topics_should_return_not_found()
    {
        $response = $this->get("/api/courses/999/topics");
        $response->assertStatus(404);
    }

    public function test_courses_controller_store_with_admin_auth_should_return_created()
    {
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $response = $this->post("/api/courses", [
            'starts_at' => '2022-05-01',
            'title' => 'test',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20'], [
            "Authorization" => "Bearer " . $auth["token"]
        ]);
        $response->assertStatus(201);
        DB::table('courses')->delete();

    }

    public function test_courses_controller_update_should_return_unauthenticated()
    {
        $response = $this->put("/api/courses", [
            'starts_at' => '2022-05-01',
            'title' => 'test updated',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20',
            "id" => "1"]);
        $response->assertStatus(302);
        DB::table('courses')->delete();
    }

    public function test_courses_controller_update_with_admin_auth_should_return_ok()
    {
        $preparedTestObject = DB::table('courses')->insertGetId([
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
        $response = $this->put("/api/courses", [
            'starts_at' => '2022-05-01',
            'title' => 'test updated',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20',
            "id" => $preparedTestObject], [
            "Authorization" => "Bearer " . $auth["token"]
        ]);
        $response->assertStatus(200);
        DB::table('courses')->delete();
    }
    public function test_courses_controller_delete_should_return_unauthenticated()
    {
        $response = $this->delete("/api/courses/1");
        $response->assertStatus(302);
    }
    public function test_courses_controller_delete_with_admin_auth_should_return_ok()
    {
        $preparedTestObject = DB::table('courses')->insertGetId([
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
        $response = $this->delete("/api/courses/".$preparedTestObject, [], [
                "Authorization" => "Bearer " . $auth["token"]
            ]);
        $response->assertStatus(200);
        DB::table('courses')->delete();
    }
}
