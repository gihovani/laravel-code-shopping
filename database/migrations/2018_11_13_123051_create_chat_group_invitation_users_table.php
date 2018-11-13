<?php

use CodeShopping\Models\ChatGroupInvitationUser;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChatGroupInvitationUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chat_group_invitation_users', function (Blueprint $table) {
            $table->increments('id');
            $table->smallInteger('status')->default(ChatGroupInvitationUser::STATUS_PENDING);
            $table->unsignedInteger('chat_group_invitation_id');
            $table->foreign('chat_group_invitation_id')
                ->references('id')
                ->on('chat_group_invitations');
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')
                ->references('id')
                ->on('users');

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
        Schema::dropIfExists('chat_group_invitation_users');
    }
}
