<?php

namespace CodeShopping\Observers;

use CodeShopping\Models\ChatGroup;
use CodeShopping\Models\ChatGroupInvitationUser;

class ChatGroupInvitationUserObserver
{
    public function updated(ChatGroupInvitationUser $userInvitation)
    {
        if ($userInvitation->status == ChatGroupInvitationUser::STATUS_PENDING ||
            $userInvitation->status == ChatGroupInvitationUser::STATUS_REPROVED) {
            return ;
        }
        /** @var ChatGroup $group */
        $group = $userInvitation->chatGroupInvitation->chatGroup;
        $userId = $userInvitation->user->id;
        $group->users()->attach($userId);
    }
}