<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class AuthTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_auth_controller_register_should_return_bad_request()
    {
        $this->post("/api/register",[])->assertStatus(302);
    }
    public function test_auth_controller_register_should_return_not_unique_email()
    {
        $this->post("/api/register",[
            "email" => "test@test.com",
            "password" => "test",
            "name"=>"test"
        ])->assertInvalid(['email'=>"The email has already been taken."]);
    }
    public function test_auth_controller_register_should_return_created() {
        $response = $this->post("/api/register",[
            "email" => "test2@test.com",
            "password" => "test",
            "name"=>"test"
        ])->assertCreated();
        DB::table("users")->delete($response['user']['id']);
    }
    public function test_auth_controller_logout_should_return_unauthenticated()
    {
        $this->post("/api/logout")->assertStatus(302);
    }
    public function test_auth_controller_logout_should_return_ok()
    {
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $this->post("/api/logout",[],[
            "Authorization" => "Bearer ". $auth["token"]
        ])->assertOk();
    }
    public function test_auth_controller_login_should_return_bad_credentials()
    {
        $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "test1426"
        ])->assertJson(["message"=>"Bad credentials"])->assertUnauthorized();
    }
    public function test_auth_controller_login_should_return_ok()
    {
        $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ])->assertOk();
    }
    public function test_auth_controller_refresh_should_return_unauthenticated()
    {
        $this->post("/api/refreshtoken")->assertRedirect();
    }
    public function test_auth_controller_refresh_should_return_ok()
    {
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $this->post("/api/refreshtoken",[],[
            "Authorization" => "Bearer ". $auth["token"]
        ])->assertOk();
    }
}
