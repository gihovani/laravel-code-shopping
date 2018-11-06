<?php

namespace CodeShopping\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class ChatGroupInvitation extends Model
{
    protected $fillable = ['total', 'expires_at', 'chat_group_id'];
    protected $dates = ['expires_at', 'deleted_at'];

    public function hasInvitation()
    {
        return $this->remaining > 0 &&
            (!$this->expires_at or (new Carbon())->lessThanOrEqualTo("{$this->expires_at} 23:59:59"));
    }

    public function chatGroup()
    {
        return $this->belongsTo(ChatGroup::class);
    }
}
