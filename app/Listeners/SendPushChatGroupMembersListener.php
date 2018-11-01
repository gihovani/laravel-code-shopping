<?php

namespace CodeShopping\Listeners;

use CodeShopping\Events\ChatMessageSentEvent;
use CodeShopping\Firebase\CloudMessagingFb;
use CodeShopping\Models\User;
use CodeShopping\Models\UserProfile;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Query\Builder;

class SendPushChatGroupMembersListener
{
    /** @var ChatMessageSentEvent $event */
    private $event;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  ChatMessageSentEvent $event
     * @return void
     */
    public function handle(ChatMessageSentEvent $event)
    {
        $this->event = $event;
        $tokens = $this->getTokens();

        if (!count($tokens)) {
            return;
        }

        $from = $this->event->getFrom();
        $chatGroup = $this->event->getChatGroup();
        /** @var CloudMessagingFb $messaging */
        $messaging = app(CloudMessagingFb::class);
        $messaging
            ->setTitle("{$from->name} enviou uma mensagem em {$chatGroup->name}")
            ->setBody($this->getBody())
            ->setTokens($tokens)
            ->setData(['chat_group_id' => $chatGroup->id])
            ->send();

    }


    private function getTokens(): array
    {
        $membersTokens = $this->getMembersTokens();
        $sellersTokens = $this->getSellersTokens();

        return array_merge($membersTokens, $sellersTokens);
    }

    private function getMembersTokens(): array
    {
        $chatGroup = $this->event->getChatGroup();
        $from = $this->event->getFrom();

        /** @var Collection $users */
        $users = $chatGroup
            ->users()
            ->whereHas('profile', function ($query) use ($from) {
                /** @var Builder $query */
                $query
                    ->whereNotNull('device_token')
                    ->whereNotIn('id', [$from->profile->id]);
            })->get();

        /** @var \Illuminate\Support\Collection $tokensCollection */
        $tokensCollection = $users->map(function ($user) {
            return $user->profile->device_token;
        });

        return $tokensCollection->toArray();
    }

    private function getSellersTokens(): array
    {
        $from = $this->event->getFrom();

        /** @var \Illuminate\Support\Collection $tokensCollection */
        $tokensCollection = UserProfile::whereNotNull('device_token')
            ->whereNotIn('id', [$from->profile->id])
            ->whereHas('user', function ($query) {
                /** @var Builder $query */
                $query->where('role', User::ROLE_SELLER);
            })
            ->get()
            ->pluck('device_token');

        return $tokensCollection->toArray();
    }

    private function getBody()
    {
        switch ($this->event->getMessageType()) {
            case 'text':
                return substr($this->event->getContent(), 0, 20);
            case 'audio':
                return 'Novo audio';
            case 'image':
                return 'Nova imagem';
        }
        return '';
    }
}
