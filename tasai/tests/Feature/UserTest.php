<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class UserTest extends TestCase
{
    public function test_user_controller_index_with_admin_should_return_ok()
    {
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $this->get("/api/users", ["Authorization"=>"Bearer ". $auth['token']])->assertOk();
    }
    public function test_user_controller_progress_controllers_should_return_not_found()
    {
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $this->get("/api/users/999/progresstrackers", ["Authorization"=>"Bearer ". $auth['token']])->assertNotFound();
    }
    public function test_user_controller_progress_controllers_should_return_ok()
    {
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $preparedCourseTestObject = DB::table('courses')->insertGetId([
            'starts_at' => '2022-05-01',
            'title' => 'test',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20'
        ]);
        $id = $auth['user']['id'];
        $preparedTrackerObject = DB::table("progresstrackers")->insertGetId([
            'completed_topics'=>0,
            'course_id'=>$preparedCourseTestObject,
            'user_id'=>$id]);
        $this->get("/api/users/$id/progresstrackers", ["Authorization"=>"Bearer ". $auth['token']])->assertOk();
        DB::table("progresstrackers")->delete();
        DB::table("courses")->delete();
    }
    public function test_user_controller_course_progress_should_return_not_found()
    {
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $this->get("/api/users/999/courseprogress/1", ["Authorization"=>"Bearer ". $auth['token']])->assertNotFound();
    }
    public function test_user_controller_course_progress_should_return_not_enrolled()
    {
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $preparedCourseTestObject = DB::table('courses')->insertGetId([
            'starts_at' => '2022-05-01',
            'title' => 'test',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20'
        ]);
        $id = $auth['user']['id'];
        $this->get("/api/users/$id/courseprogress/$preparedCourseTestObject", ["Authorization"=>"Bearer ". $auth['token']])
            ->assertOk()->assertJsonFragment(["progress"=>"This user has not enrolled in the course with specified id"]);
        DB::table("progresstrackers")->delete();
        DB::table("courses")->delete();
    }
    public function test_user_controller_course_progress_should_return_ok()
    {
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $preparedCourseTestObject = DB::table('courses')->insertGetId([
            'starts_at' => '2022-05-01',
            'title' => 'test',
            'short_description' => 'test',
            'long_description' => 'test',
            'duration' => '20',
            'cost' => '20'
        ]);
        $id = $auth['user']['id'];
        $preparedTrackerObject = DB::table("progresstrackers")->insertGetId([
            'completed_topics'=>0,
            'course_id'=>$preparedCourseTestObject,
            'user_id'=>$id]);
        $this->get("/api/users/$id/courseprogress/$preparedCourseTestObject", ["Authorization"=>"Bearer ". $auth['token']])
            ->assertOk();
        DB::table("progresstrackers")->delete();
        DB::table("courses")->delete();
    }
    public function test_user_controller_show_should_return_not_found()
    {
        $this->get("/api/users/999")->assertNotFound();
    }
    public function test_user_controller_store_should_return_created()
    {
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $result = $this->post("/api/users",
            [
                "name"=>"test2",
                "email"=>"kek@kekistan.com",
                "password"=>"ihaventsleptproperlyinlike7days"
            ],["Authorization"=>"Bearer ". $auth['token']])->assertCreated();
        DB::table("users")->delete($result["id"]);
    }
    public function test_user_controller_update_should_return_unauthorized()
    {
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $result = $this->post("/api/users",
            [
                "name"=>"test2",
                "email"=>"kek@kekistan.com",
                "password"=> bcrypt("ihaventsleptproperlyinlike7days")
            ],["Authorization"=>"Bearer ". $auth['token']]);
        $user = $this->post("/api/login", [
            "email"=>"kek@kekistan.com",
            "password"=>"ihaventsleptproperlyinlike7days"
        ]);
        $this->put("/api/users",[
            "name"=>"test2",
            "email"=>"kek@kekistan.com",
            "id"=>$user['user']['id']
        ], ["Authorization"=>"Bearer ". $auth['token']])->assertUnauthorized();
        DB::table("users")->delete($user['user']["id"]);
    }
    public function test_user_controller_update_should_return_not_found() {
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $result = $this->post("/api/users",
            [
                "name"=>"test2",
                "email"=>"kek@kekistan.com",
                "password"=> bcrypt("ihaventsleptproperlyinlike7days")
            ],["Authorization"=>"Bearer ". $auth['token']]);
        $user = $this->post("/api/login", [
            "email"=>"kek@kekistan.com",
            "password"=>"ihaventsleptproperlyinlike7days"
        ]);
        $this->put("/api/users",[
            "name"=>"test2",
            "email"=>"kek@kekistan.com",
            "id"=>$user['user']['id']+1
        ], ["Authorization"=>"Bearer ". $auth['token']])->assertNotFound();
        DB::table("users")->delete($user['user']["id"]);
    }
    public function test_user_controller_update_should_return_ok()
    {
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $this->put("/api/users",[
            "name"=>"testium",
            "email"=>"test@test.com",
            "id"=>$auth['user']['id']
        ], ["Authorization"=>"Bearer ". $auth['token']])->assertOk();
    }
    public function test_user_controller_delete_should_return_not_found() {
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $result = $this->post("/api/users",
            [
                "name"=>"test2",
                "email"=>"kek@kekistan.com",
                "password"=> bcrypt("ihaventsleptproperlyinlike7days")
            ],["Authorization"=>"Bearer ". $auth['token']]);
        $user = $this->post("/api/login", [
            "email"=>"kek@kekistan.com",
            "password"=>"ihaventsleptproperlyinlike7days"
        ]);
        $this->delete("/api/users",[
            "id"=>$user['user']['id']+1
        ], ["Authorization"=>"Bearer ". $auth['token']])->assertNotFound();
        DB::table("users")->delete($user['user']["id"]);
    }
    public function test_user_controller_destroy_should_return_ok()
    {
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $result = $this->post("/api/users",
            [
                "name"=>"test2",
                "email"=>"kek@kekistan.com",
                "password"=> bcrypt("ihaventsleptproperlyinlike7days")
            ],["Authorization"=>"Bearer ". $auth['token']]);
        $user = $this->post("/api/login", [
            "email"=>"kek@kekistan.com",
            "password"=>"ihaventsleptproperlyinlike7days"
        ]);
        $this->delete("/api/users",[
            "id"=>$user['user']['id']
        ], ["Authorization"=>"Bearer ". $auth['token']])->assertOk();
        DB::table("users")->delete($user['user']["id"]);
    }
}
