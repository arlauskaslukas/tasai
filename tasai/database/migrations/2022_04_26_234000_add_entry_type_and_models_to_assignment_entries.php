<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddEntryTypeAndModelsToAssignmentEntries extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('assignmententries', function (Blueprint $table) {
            $table->foreignId('ann_model_id')->nullable()->constrained('ann_models');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('assignmententries', function (Blueprint $table) {
            $table->dropColumn(['ann_model_id']);
        });
    }
}
