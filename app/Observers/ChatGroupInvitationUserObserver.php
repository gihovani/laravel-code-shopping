<?php

namespace CodeShopping\Observers;

use CodeShopping\Models\ChatGroup;
use CodeShopping\Models\ChatGroupInvitation;
use CodeShopping\Models\ChatGroupInvitationUser;

class ChatGroupInvitationUserObserver
{
    public function created(ChatGroupInvitationUser $userInvitation)
    {
        /** @var ChatGroupInvitation $linkInvitation */
        $linkInvitation = $userInvitation->chatGroupInvitation;
        $linkInvitation->remaining -= 1;
        $linkInvitation->save();
    }

    public function updated(ChatGroupInvitationUser $userInvitation)
    {
        if ($userInvitation->status == ChatGroupInvitationUser::STATUS_PENDING) {
            return;
        }

        if ($userInvitation->status == ChatGroupInvitationUser::STATUS_REPROVED) {
            /** @var ChatGroupInvitation $linkInvitation */
            $linkInvitation = $userInvitation->chatGroupInvitation;
            $linkInvitation->remaining += 1;
            $linkInvitation->save();
            return;
        }
        /** @var ChatGroup $group */
        $group = $userInvitation->chatGroupInvitation->chatGroup;
        $userId = $userInvitation->user->id;
        $group->users()->attach($userId);
    }
}