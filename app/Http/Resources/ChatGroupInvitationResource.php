<?php

namespace CodeShopping\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ChatGroupInvitationResource extends JsonResource
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
            'total' => intval($this->total),
            'remaining' => intval($this->remaining),
            'expires_at' => ($this->expires_at) ? $this->expires_at->format('Y-m-d H:i:s') : null,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
        if (!$this->isCollection) {
            $data['chat_group'] = new ChatGroupResource($this->chatGroup);
        }
        return $data;
    }
}
