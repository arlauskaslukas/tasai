<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class TimetableTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_timetables_controller_index_should_return_ok()
    {
        $response = $this->get('/api/timetables');

        $response->assertStatus(200);
    }

    public function test_timetables_controller_show_should_return_not_found()
    {
        $response = $this->get("/api/timetables/999");
        $response->assertStatus(404);
    }

    public function test_timetables_controller_show_should_return_ok()
    {
        $preparedCourseTestObject = DB::table('courses')->insertGetId([
            'starts_at' => '2022-05-01',
            'title' => 'test',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20'
        ]);
        $preparedTopicTestObject = DB::table('topics')->insertGetId([
            'topic_order' => '1',
            'title' => 'test updated',
            'short_description' => 'test',
            'theory' => 'test',
            'course_id' => $preparedCourseTestObject,
        ]);
        $preparedTimetableTestObject = DB::table('timetableentries')->insertGetId([
            "lesson_time"=>"2021-11-24 10:00:00",
            "entry_title"=>"test",
            "link"=>"test.test",
            'course_id' => $preparedCourseTestObject,
            "topic_id"=>$preparedTopicTestObject
        ]);
        $response = $this->get("/api/timetables/$preparedTimetableTestObject");
        $response->assertStatus(200);
        DB::table('timetableentries')->delete();
        DB::table('topics')->delete();
        DB::table('courses')->delete();
    }

    public function test_timetables_controller_store_should_return_unauthenticated()
    {
        $response = $this->post("/api/timetables", [
            "lesson_time"=>"2021-11-24 10:00:00",
            "entry_title"=>"test",
            "link"=>"test.test",
            "long_description"=>"test",
            'course_id' => 1,
            "topic_id"=>1
        ]);
        $response->assertStatus(302);
    }

    public function test_timetables_controller_store_with_admin_auth_should_return_created()
    {
        $preparedCourseTestObject = DB::table('courses')->insertGetId([
            'starts_at' => '2022-05-01',
            'title' => 'test',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20'
        ]);
        $preparedTopicTestObject = DB::table('topics')->insertGetId([
            'topic_order' => '1',
            'title' => 'test updated',
            'short_description' => 'test',
            'theory' => 'test',
            'course_id' => $preparedCourseTestObject,
        ]);
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $response = $this->post("/api/timetables", [
            "lesson_time"=>"2021-11-24 10:00:00",
            "entry_title"=>"test",
            "link"=>"test.test",
            'course_id' => $preparedCourseTestObject,
            "topic_id"=>$preparedTopicTestObject
        ], ["Authorization" => "Bearer " . $auth["token"]]);
        $response->assertStatus(201);
        DB::table('timetableentries')->delete();
        DB::table('topics')->delete();
        DB::table('courses')->delete();
    }

    public function test_timetables_controller_update_should_return_unauthenticated()
    {
        $response = $this->put("/api/timetables", [
            "lesson_time"=>"2021-11-24 10:00:00",
            "entry_title"=>"test",
            "link"=>"test.test",
            'course_id' => 1,
            "topic_id"=>1,
            "id" => "1"]);
        $response->assertStatus(302);
    }

    public function test_timetables_controller_update_with_admin_auth_should_return_ok()
    {
        $preparedCourseTestObject = DB::table('courses')->insertGetId([
            'starts_at' => '2022-05-01',
            'title' => 'test',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20'
        ]);
        $preparedTopicTestObject = DB::table('topics')->insertGetId([
            'topic_order' => '1',
            'title' => 'test updated',
            'short_description' => 'test',
            'theory' => 'test',
            'course_id' => $preparedCourseTestObject,
        ]);
        $preparedTimetableTestObject = DB::table('timetableentries')->insertGetId([
            "lesson_time"=>"2021-11-24 10:00:00",
            "entry_title"=>"test",
            "link"=>"test.test",
            'course_id' => $preparedCourseTestObject,
            "topic_id"=>$preparedTopicTestObject
        ]);
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $response = $this->put("/api/timetables", [
            "lesson_time"=>"2021-11-24 10:00:00",
            "entry_title"=>"test",
            "link"=>"test.test",
            'course_id' => $preparedCourseTestObject,
            "topic_id"=>$preparedTopicTestObject,
            "id" => $preparedTimetableTestObject], [
            "Authorization" => "Bearer " . $auth["token"]
        ]);
        $response->assertStatus(200);
        DB::table('timetableentries')->delete();
        DB::table('topics')->delete();
        DB::table('courses')->delete();
    }
    public function test_timetables_controller_delete_should_return_unauthenticated()
    {
        $response = $this->delete("/api/timetables/1");
        $response->assertStatus(302);
    }
    public function test_timetables_controller_delete_with_admin_auth_should_return_ok()
    {
        $preparedCourseTestObject = DB::table('courses')->insertGetId([
            'starts_at' => '2022-05-01',
            'title' => 'test',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20'
        ]);
        $preparedTopicTestObject = DB::table('topics')->insertGetId([
            'topic_order' => '1',
            'title' => 'test updated',
            'short_description' => 'test',
            'theory' => 'test',
            'course_id' => $preparedCourseTestObject,
        ]);
        $preparedTimetableTestObject = DB::table('timetableentries')->insertGetId([
            "lesson_time"=>"2021-11-24 10:00:00",
            "entry_title"=>"test",
            "link"=>"test.test",
            'course_id' => $preparedCourseTestObject,
            "topic_id"=>$preparedTopicTestObject
        ]);
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $response = $this->delete("/api/timetables/$preparedTimetableTestObject",[], [
            "Authorization" => "Bearer " . $auth["token"]
        ]);
        $response->assertStatus(200);
        DB::table('timetableentries')->delete();
        DB::table('topics')->delete();
        DB::table('courses')->delete();
    }
}
