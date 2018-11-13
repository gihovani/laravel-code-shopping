<?php

namespace CodeShopping\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ChatGroupInvitationUserResource extends JsonResource
{
    /**
     * @var bool
     */
    private $isCollection;

    public function __construct($resource, $isCollection = false)
    {
        parent::__construct($resource);
        $this->isCollection = $isCollection;
    }

    public function toArray($request)
    {
        $data = [
            'id' => $this->id,
            'user' => new UserResource($this->user),
            'status' => (int)$this->status,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
        if (!$this->isCollection) {
            $data['chat_group_invitation'] = new ChatGroupInvitationResource($this->chatGroupInvitation);
        }
        return $data;
    }
}
