<?php

namespace CodeShopping\Observers;

use CodeShopping\Models\ChatGroupInvitation;

class ChatGroupInvitationObserver
{
    public function creating(ChatGroupInvitation $invitation)
    {
        $invitation->slug = str_random(7);
        $invitation->remaining = $invitation->total;
    }
}