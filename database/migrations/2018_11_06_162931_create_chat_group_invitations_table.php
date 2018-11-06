<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChatGroupInvitationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chat_group_invitations', function (Blueprint $table) {
            $table->increments('id');
            $table->string('slug');
            $table->integer('total')->unsigned();
            $table->integer('remaining')->unsigned();
            $table->date('expires_at')->nullable();

            $table->unsignedInteger('chat_group_id');
            $table->foreign('chat_group_id')
                ->references('id')
                ->on('chat_groups');
            $table->softDeletes();
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
        Schema::dropIfExists('chat_group_invitations');
    }
}
