<?php

namespace CodeShopping\Http\Resources;

use CodeShopping\Models\ChatGroup;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ChatGroupInvitationUserCollection extends ResourceCollection
{
    /**
     * @var ChatGroup
     */
    private $chatGroup;

    public function __construct($resource, ChatGroup $chatGroup)
    {
        $this->chatGroup = $chatGroup;
        parent::__construct($resource);
    }

    public function toArray($request)
    {
        return [
            'chat_group' => new ChatGroupResource($this->chatGroup),
            'invitations' => $this->collection->map(function ($invitation) {
                return new ChatGroupInvitationUserResource($invitation, true);
            })
        ];
    }
}
