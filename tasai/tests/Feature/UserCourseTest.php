<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class UserCourseTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_user_course_controller_index_should_return_ok()
    {
        $this->get("/api/progresstrackers")->assertOk();
    }
    public function test_user_course_controller_show_should_return_not_found()
    {
        $preparedCourseTestObject = DB::table('courses')->insertGetId([
            'starts_at' => '2022-05-01',
            'title' => 'test',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20'
        ]);
        $preparedTrackerObject = DB::table("progresstrackers")->insertGetId([
            'completed_topics'=>0,
            'course_id'=>$preparedCourseTestObject,
            'user_id'=>1]);
        $id = $preparedTrackerObject+1;
        $this->get("/api/progresstrackers/$id")->assertNotFound();
        DB::table("progresstrackers")->delete();
        DB::table("courses")->delete();
    }
    public function test_user_course_controller_show_should_return_ok()
    {
        $preparedCourseTestObject = DB::table('courses')->insertGetId([
            'starts_at' => '2022-05-01',
            'title' => 'test',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20'
        ]);
        $preparedTrackerObject = DB::table("progresstrackers")->insertGetId([
            'completed_topics'=>0,
            'course_id'=>$preparedCourseTestObject,
            'user_id'=>1]);
        $this->get("/api/progresstrackers/$preparedTrackerObject")->assertOk();
        DB::table("progresstrackers")->delete();
        DB::table("courses")->delete();
    }
    public function test_user_course_controller_store_should_return_unauthorized()
    {
        $preparedCourseTestObject = DB::table('courses')->insertGetId([
            'starts_at' => '2022-05-01',
            'title' => 'test',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20'
        ]);
        $this->post("/api/progresstrackers", ["course_id"=>$preparedCourseTestObject])->assertRedirect();
        DB::table("progresstrackers")->delete();
        DB::table("courses")->delete();
    }
    public function test_user_course_controller_store_should_return_created()
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
        $this->post("/api/progresstrackers", ["course_id"=>$preparedCourseTestObject],
        ["Authorization"=>"Bearer " . $auth['token']])->assertCreated();
        DB::table("progresstrackers")->delete();
        DB::table("courses")->delete();
    }
    public function test_user_course_controller_update_should_return_unauthorized()
    {
        $preparedCourseTestObject = DB::table('courses')->insertGetId([
            'starts_at' => '2022-05-01',
            'title' => 'test',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20'
        ]);
        $preparedTrackerObject = DB::table("progresstrackers")->insertGetId([
            'completed_topics'=>0,
            'course_id'=>$preparedCourseTestObject,
            'user_id'=>1]);
        $this->put("/api/progresstrackers", [
            "id"=>$preparedTrackerObject,
            "user_id"=>1,
            "completed_topics"=>1])->assertRedirect();
        DB::table("progresstrackers")->delete();
        DB::table("courses")->delete();
    }
    public function test_user_course_controller_update_should_return_ok()
    {
        $preparedCourseTestObject = DB::table('courses')->insertGetId([
            'starts_at' => '2022-05-01',
            'title' => 'test',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20'
        ]);
        $preparedTrackerObject = DB::table("progresstrackers")->insertGetId([
            'completed_topics'=>0,
            'course_id'=>$preparedCourseTestObject,
            'user_id'=>1]);
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $this->put("/api/progresstrackers", [
            "id"=>$preparedTrackerObject,
            "user_id"=>1,
            "completed_topics"=>1],
            ["Authorization"=>"Bearer " . $auth['token']])->assertOk();
        DB::table("progresstrackers")->delete();
        DB::table("courses")->delete();
    }
    public function test_user_course_controller_get_personal_trackers_should_return_unauthorized()
    {
        $preparedCourseTestObject = DB::table('courses')->insertGetId([
            'starts_at' => '2022-05-01',
            'title' => 'test',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20'
        ]);
        $preparedTrackerObject = DB::table("progresstrackers")->insertGetId([
            'completed_topics'=>0,
            'course_id'=>$preparedCourseTestObject,
            'user_id'=>1]);
        $this->get("/api/personaltrackers")->assertRedirect();
        DB::table("progresstrackers")->delete();
        DB::table("courses")->delete();
    }
    public function test_user_course_controller_get_personal_trackers_should_return_ok()
    {
        $preparedCourseTestObject = DB::table('courses')->insertGetId([
            'starts_at' => '2022-05-01',
            'title' => 'test',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20'
        ]);
        $preparedTrackerObject = DB::table("progresstrackers")->insertGetId([
            'completed_topics'=>0,
            'course_id'=>$preparedCourseTestObject,
            'user_id'=>1]);
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $this->get("/api/personaltrackers",[
            "Authorization"=>"Bearer ". $auth['token']
        ])->assertOk();
        DB::table("progresstrackers")->delete();
        DB::table("courses")->delete();
    }
    public function test_user_course_controller_delete_should_return_unauthorized()
    {
        $preparedCourseTestObject = DB::table('courses')->insertGetId([
            'starts_at' => '2022-05-01',
            'title' => 'test',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20'
        ]);
        $preparedTrackerObject = DB::table("progresstrackers")->insertGetId([
            'completed_topics'=>0,
            'course_id'=>$preparedCourseTestObject,
            'user_id'=>1]);
        $this->delete("/api/progresstrackers", ["id"=>$preparedTrackerObject])->assertRedirect();
        DB::table("progresstrackers")->delete();
        DB::table("courses")->delete();
    }
    public function test_user_course_controller_delete_with_admin_auth_should_return_ok()
    {
        $preparedCourseTestObject = DB::table('courses')->insertGetId([
            'starts_at' => '2022-05-01',
            'title' => 'test',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20'
        ]);
        $preparedTrackerObject = DB::table("progresstrackers")->insertGetId([
            'completed_topics'=>0,
            'course_id'=>$preparedCourseTestObject,
            'user_id'=>1]);
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $this->delete("/api/progresstrackers", ["id"=>$preparedTrackerObject], [
            "Authorization"=>"Bearer " . $auth['token']
        ])->assertOk();
        DB::table("progresstrackers")->delete();
        DB::table("courses")->delete();
    }
}
