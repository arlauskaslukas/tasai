<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLayerParametersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('layer_parameters', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("type");
            $table->string("value");
            $table->foreignId("layer_id")->constrained("layers");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('layer_parameters');
    }
}
