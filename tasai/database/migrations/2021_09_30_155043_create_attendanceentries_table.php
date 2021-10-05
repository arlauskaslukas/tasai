<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttendanceentriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attendanceentries', function (Blueprint $table) {
            $table->id();
            $table->boolean('is_attending');
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('topic_id')->constrained('topics');
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
        Schema::dropIfExists('attendanceentries');
    }
}
