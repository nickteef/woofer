<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
			$table->foreignId("userId");
			$table->foreignId("woofId");
			$table->integer("upvoted");
			$table->integer("downvoted");
            $table->timestamps();

			$table->foreign("userId")->references("id")->on("users")->onDelete('cascade');
			$table->foreign("woofId")->references("id")->on("woof")->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ratings');
    }
};
