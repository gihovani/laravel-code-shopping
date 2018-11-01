<?php

namespace CodeShopping\Events;

use CodeShopping\Models\ChatGroup;
use CodeShopping\Models\User;

class ChatMessageSentEvent
{
    private $chatGroup;
    private $messageType;
    private $content;
    private $from;

    public function __construct(ChatGroup $chatGroup, $messageType, $content, User $from)
    {
        $this->chatGroup = $chatGroup;
        $this->messageType = $messageType;
        $this->content = $content;
        $this->from = $from;
    }

    /**
     * @return ChatGroup
     */
    public function getChatGroup(): ChatGroup
    {
        return $this->chatGroup;
    }

    /**
     * @return mixed
     */
    public function getMessageType()
    {
        return $this->messageType;
    }

    /**
     * @return mixed
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * @return User
     */
    public function getFrom(): User
    {
        return $this->from;
    }


}
