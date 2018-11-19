<?php

namespace CodeShopping\Observers;

use CodeShopping\Firebase\CloudMessagingFb;
use CodeShopping\Firebase\NotificationType;
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
        $this->sendPushNotification($userInvitation);
    }

    private function sendPushNotification(ChatGroupInvitationUser $userInvitation)
    {
        /** @var ChatGroup $group */
        $group = $userInvitation->chatGroupInvitation->chatGroup;
        $token = $userInvitation->user->profile->device_token;
        if (!$token) {
            return;
        }
        /** @var CloudMessagingFb $messaging */
        $messaging = app(CloudMessagingFb::class);
        $messaging
            ->setTitle('Sua inscrição foi aprovada')
            ->setBody('Você está escrito em um novo grupo.')
            ->setTokens([$token])
            ->setData([
                'type' => NotificationType::CHAT_GROUP_SUBSCRIBE,
                'chat_group_name' => $group->name
            ])
            ->send();
    }

}