<?php

namespace Tests\Feature;

use App\Models\Course;
use App\Models\Topic;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class TopicTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_topics_controller_index_should_return_ok()
    {
        $response = $this->get('/api/topics');

        $response->assertStatus(200);
    }

    public function test_topics_controller_show_should_return_not_found()
    {
        $response = $this->get("/api/topics/999");
        $response->assertStatus(404);
    }

    public function test_topics_controller_show_should_return_ok()
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
        $response = $this->get("/api/topics/$preparedTopicTestObject");
        $response->assertStatus(200);
        DB::table('topics')->delete();
        DB::table('courses')->delete();
    }

    public function test_topics_controller_store_should_return_unauthenticated()
    {
        $response = $this->post("/api/topics", [
            'topic_order' => '1',
            'title' => 'test updated',
            'short_description' => 'test',
            'theory' => 'test',
            'course_id' => '1',]);
        $response->assertStatus(302);
    }

    public function test_topics_controller_store_with_admin_auth_should_return_created()
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
        $response = $this->post("/api/topics", [
            'topic_order' => '1',
            'title' => 'test updated',
            'short_description' => 'test',
            'theory' => 'test',
            'course_id' => $preparedTestObject,], [
            "Authorization" => "Bearer " . $auth["token"]
        ]);
        $response->assertStatus(201);

        DB::table('topics')->delete();
        DB::table('courses')->delete();
    }

    public function test_topics_controller_update_should_return_unauthenticated()
    {
        $response = $this->put("/api/topics", [
            'topic_order' => '1',
            'title' => 'test updated',
            'short_description' => 'test',
            'theory' => 'test',
            'course_id' => '1',
            "id" => "1"]);
        $response->assertStatus(302);
    }

    public function test_topics_controller_update_with_admin_auth_should_return_ok()
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
        $response = $this->put("/api/topics", [
            'topic_order' => '1',
            'title' => 'test updated',
            'short_description' => 'test',
            'theory' => 'test',
            'course_id' => $preparedCourseTestObject,
            "id" => $preparedTopicTestObject], [
            "Authorization" => "Bearer " . $auth["token"]
        ]);
        DB::table('topics')->delete($preparedTopicTestObject);
        DB::table('courses')->delete($preparedCourseTestObject);
        $response->assertStatus(200);
    }
    public function test_topics_controller_delete_should_return_unauthenticated()
    {
        $response = $this->delete("/api/topics", ["id"=>"1"]);
        $response->assertStatus(302);
    }
    public function test_topics_controller_delete_with_admin_auth_should_return_ok()
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
        $response = $this->delete("/api/topics", ["id"=>$preparedTopicTestObject], [
            "Authorization" => "Bearer " . $auth["token"]
        ]);
        $response->assertStatus(200);
        DB::table('topics')->delete();
        DB::table('courses')->delete();
    }
}
