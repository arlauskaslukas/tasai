<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ANNModelTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_ann_model_controller_parse_model_from_json_should_return_ok()
    {
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $this->post("/api/generate_model", [
            "optimizer"=>"adam",
            "loss"=>"categorical_crossentropy",
            "user_id"=>$auth['user']['id'],
            "metrics"=>["accuracy"],
            "layers"=> [
                [
                    "title"=>"Input",
                    "hyperparameters"=>[
                        "input_shape"=>"(20,20)",
                        "batch_size"=>"10"
                    ]
                ],
                [
                    "title"=>"Conv2D",
                    "hyperparameters"=>[
                        "filters"=>"8",
                        "kernel_size"=>"(3,3)",
                        "strides"=>"(1,1)",
                        "padding"=>"same",
                        "activation"=>"relu"
                    ]
                ],
                [
                    "title"=>"Flatten",
                    "hyperparameters"=>[
                        "data_format"=>"channels_first"
                    ]
                ],
                [
                    "title"=>"Dropout",
                    "hyperparameters"=>[
                        "rate"=>"0.7"
                    ]
                ],
                [
                    "title"=>"Dense",
                    "hyperparameters"=>[
                        "units"=>"64",
                        "activation"=>"relu"
                    ]
                ]
            ]
        ], ["Authorization"=>"Bearer ". $auth["token"]])
            ->assertOk()->assertJsonStructure(["model"]);
    }
    public function test_ann_model_controller_parse_model_from_json_should_return_unauthorized()
    {
        $this->post("/api/generate_model", [
            "optimizer"=>"adam",
            "loss"=>"categorical_crossentropy",
            "metrics"=>["accuracy"],
            "layers"=> [
                [
                    "title"=>"Input",
                    "hyperparameters"=>[
                        "input_shape"=>"(20,20)",
                        "batch_size"=>"10"
                    ]
                ]
            ]
        ])
            ->assertRedirect();
    }
    public function test_ann_model_controller_save_model_should_return_unauthorized()
    {
        $this->post("/api/save_model", [
            "optimizer"=>"adam",
            "loss"=>"categorical_crossentropy",
            "metrics"=>[
                "name"=>"accuracy"
            ],
            "layers"=> [
                [
                    "title"=>"Input",
                    "hyperparameters"=>[
                        "input_shape"=>"(20,20)",
                        "batch_size"=>"10"
                    ]
                ]
            ]
        ])
            ->assertRedirect();
    }
    public function test_ann_model_controller_save_model_should_return_missing_optimizer()
    {
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $this->post("/api/save_model", [
            "title"=>"test",
            "loss"=>"categorical_crossentropy",
            "metrics"=>[
                "name"=>"accuracy"
            ],
            "layers"=> [
                [
                    "title"=>"Input",
                    "hyperparameters"=>[
                        "input_shape"=>"(20,20)",
                        "batch_size"=>"10"
                    ]
                ]
            ]
        ], ["Authorization"=>"Bearer ". $auth["token"]])
            ->assertInvalid(['optimizer'=>"The optimizer field is required."]);
    }
    public function test_ann_model_controller_save_model_should_return_missing_layers()
    {
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $this->post("/api/save_model", [
            "title"=>"test",
            "optimizer"=>"adam",
            "loss"=>"categorical_crossentropy",
            "metrics"=>[
                [
                    "name"=>"accuracy"
                ]
            ]
        ], ["Authorization"=>"Bearer ". $auth["token"]])
            ->assertInvalid(['layers'=>"The layers field is required."]);
    }
    public function test_ann_model_controller_save_model_should_return_created()
    {
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $this->post("/api/save_model", [
            "title"=>"test",
            "optimizer"=>"adam",
            "loss"=>"categorical_crossentropy",
            "metrics"=>[
                [
                    "name"=>"accuracy"
                ]
            ],
            "layers"=> [
                [
                    "title"=>"Input",
                    "hyperparameters"=>[
                        "input_shape"=>"(20,20)",
                        "batch_size"=>"10"
                    ]
                ]
            ]
        ], ["Authorization"=>"Bearer ". $auth["token"]])
            ->assertCreated();
    }
    public function test_ann_model_controller_user_models_should_return_unauthorized()
    {
        $this->get("/api/user_models")->assertRedirect();
    }
    public function test_ann_model_controller_user_models_should_return_ok()
    {
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $this->get("/api/user_models",["Authorization"=>"Bearer ". $auth["token"]])->assertOk();
    }
    public function test_ann_model_controller_get_model_should_return_not_found()
    {
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $preparedANNObject = DB::table("ann_models")->insertGetId([
            "title"=>"test",
            "optimizer"=>"adam",
            "loss"=>"categorical_crossentropy",
            "user_id"=>$auth['user']['id']
        ]);
        $id = $preparedANNObject + 1;
        $this->post("/api/getmodel", ["id"=>$id], ["Authorization"=>"Bearer ". $auth["token"]])
            ->assertNotFound()->assertJson(["message"=>"not found"]);
    }
    public function test_ann_model_controller_get_model_should_return_unauthorized()
    {
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $preparedANNObject = DB::table("ann_models")->insertGetId([
            "title"=>"test",
            "optimizer"=>"adam",
            "loss"=>"categorical_crossentropy",
            "user_id"=>$auth['user']['id']
        ]);
        $this->post("/api/getmodel", ["id"=>$preparedANNObject])
            ->assertRedirect();
    }
    public function test_ann_model_controller_get_model_should_return_ok()
    {
        $auth = $this->post("/api/login", [
            "email" => "test@test.com",
            "password" => "pwd156894"
        ]);
        $preparedANNObject = DB::table("ann_models")->insertGetId([
            "title"=>"test",
            "optimizer"=>"adam",
            "loss"=>"categorical_crossentropy",
            "user_id"=>$auth['user']['id']
        ]);
        $this->post("/api/getmodel", ["id"=>$preparedANNObject], ["Authorization"=>"Bearer ". $auth["token"]])
            ->assertOk();
    }
}
