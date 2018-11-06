<?php

namespace CodeShopping\Http\Resources;

use CodeShopping\Models\ChatGroup;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ChatGroupInvitationCollection extends ResourceCollection
{
    /**
     * @var ChatGroup
     */
    private $group;

    public function __construct($resource, ChatGroup $group)
    {
        parent::__construct($resource);
        $this->group = $group;
    }

    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'chat_group' => new ChatGroupResource($this->group),
            'link_invitations' => $this->collection->map(function ($invitation) {
                return new ChatGroupInvitationResource($invitation, true);
            })
        ];
    }
}
