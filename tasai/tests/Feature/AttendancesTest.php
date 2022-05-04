<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class AttendancesTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function test_attendances_controller_index_should_return_ok()
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
        $preparedAttendanceTestObject = DB::table('attendanceentries')->insertGetId([
            "is_attending" => 1,
            "user_id" => 1,
            "topic_id" => $preparedTopicTestObject
        ]);
        $response = $this->get('/api/attendances');

        $response->assertStatus(200);
        DB::table('attendanceentries')->delete();
        DB::table('topics')->delete();
        DB::table('courses')->delete();
    }

    public function test_attendances_controller_show_should_return_not_found()
    {
        $response = $this->get("/api/attendances/999");
        $response->assertStatus(404);
    }

    public function test_attendances_controller_show_should_return_ok()
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
        $preparedAttendanceTestObject = DB::table('attendanceentries')->insertGetId([
            "is_attending" => 1,
            "user_id" => 1,
            "topic_id" => $preparedTopicTestObject
        ]);
        $response = $this->get("/api/attendances/$preparedAttendanceTestObject");
        $response->assertStatus(200);
        DB::table('attendanceentries')->delete();
        DB::table('topics')->delete();
        DB::table('courses')->delete();
    }

    public function test_attendances_controller_store_should_return_unauthenticated()
    {
        $response = $this->post("/api/attendances", [
            "is_attending" => 1,
            "user_id" => 1,
            "topic_id" => 1
        ]);
        $response->assertStatus(302);
    }

    public function test_attendances_controller_store_with_admin_auth_should_return_created()
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
        $response = $this->post("/api/attendances", [
            "is_attending" => 1,
            "user_id" => 1,
            "topic_id" => $preparedTopicTestObject], [
            "Authorization" => "Bearer " . $auth["token"]
        ]);
        $response->assertStatus(201);
        DB::table('attendanceentries')->delete();
        DB::table('topics')->delete();
        DB::table('courses')->delete();
    }

    public function test_attendances_controller_update_should_return_unauthenticated()
    {
        $response = $this->put("/api/attendances", [
            "is_attending" => 1,
            "user_id" => 1,
            "topic_id" => 1,
            "id" => "1"]);
        $response->assertStatus(302);
    }

    public function test_attendances_controller_update_with_admin_auth_should_return_ok()
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
        $preparedAttendanceTestObject = DB::table('attendanceentries')->insertGetId([
            "is_attending" => 1,
            "user_id" => 1,
            "topic_id" => $preparedTopicTestObject
        ]);
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $response = $this->put("/api/attendances", [
            "is_attending" => 1,
            "user_id" => 1,
            "topic_id" => $preparedTopicTestObject,
            "id" => $preparedAttendanceTestObject], [
            "Authorization" => "Bearer " . $auth["token"]
        ]);
        $response->assertStatus(200);
        DB::table('attendanceentries')->delete();
        DB::table('topics')->delete();
        DB::table('courses')->delete();
    }

    public function test_attendances_controller_delete_should_return_unauthenticated()
    {
        $response = $this->delete("/api/attendances", ["id" => "1"]);
        $response->assertStatus(302);
    }

    public function test_attendances_controller_delete_with_admin_auth_should_return_ok()
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
        $preparedAttendanceTestObject = DB::table('attendanceentries')->insertGetId([
            "is_attending" => 1,
            "user_id" => 1,
            "topic_id" => $preparedTopicTestObject
        ]);
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $response = $this->delete("/api/attendances", ["id" => $preparedAttendanceTestObject], [
            "Authorization" => "Bearer " . $auth["token"]
        ]);
        $response->assertStatus(200);
        DB::table('attendanceentries')->delete();
        DB::table('topics')->delete();
        DB::table('courses')->delete();
    }
    public function test_attendances_controller_check_if_user_has_participated_should_return_ok_false()
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
        $response = $this->post("/api/checkattendancestatus", ["topic_id" => $preparedTopicTestObject], [
            "Authorization" => "Bearer " . $auth["token"]
        ]);
        $response->assertStatus(200)->assertJson(["message"=>false]);
        DB::table('attendanceentries')->delete();
        DB::table('topics')->delete();
        DB::table('courses')->delete();
    }
    public function test_attendances_controller_check_if_user_has_participated_should_return_ok_with_status()
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
        $preparedAttendanceTestObject = DB::table('attendanceentries')->insertGetId([
            "is_attending" => 1,
            "user_id" => $auth['user']['id'],
            "topic_id" => $preparedTopicTestObject
        ]);
        $response = $this->post("/api/checkattendancestatus", ["topic_id" => $preparedTopicTestObject], [
            "Authorization" => "Bearer " . $auth["token"]
        ]);
        $response->assertStatus(200)->assertJsonStructure(["message"]);
        DB::table('attendanceentries')->delete();
        DB::table('topics')->delete();
        DB::table('courses')->delete();
    }
    public function test_attendances_controller_save_or_update_participation_should_return_created()
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
        $preparedAttendanceTestObject = DB::table('attendanceentries')->insertGetId([
            "is_attending" => 1,
            "user_id" => $auth['user']['id'],
            "topic_id" => $preparedTopicTestObject
        ]);
        $response = $this->post("/api/saveattendance", ["topic_id" => $preparedTopicTestObject], [
            "Authorization" => "Bearer " . $auth["token"]
        ]);
        $response->assertStatus(200)->assertJsonStructure(["message"]);
        DB::table('attendanceentries')->delete();
        DB::table('topics')->delete();
        DB::table('courses')->delete();
    }
    public function test_attendances_controller_save_or_update_participation_should_return_ok()
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
        $response = $this->post("/api/saveattendance", ["topic_id" => $preparedTopicTestObject], [
            "Authorization" => "Bearer " . $auth["token"]
        ]);
        $response->assertStatus(201)->assertJsonStructure(["message"]);
        DB::table('attendanceentries')->delete();
        DB::table('topics')->delete();
        DB::table('courses')->delete();
    }
}
