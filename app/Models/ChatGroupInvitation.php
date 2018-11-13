<?php

namespace CodeShopping\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChatGroupInvitation extends Model
{
    use SoftDeletes;

    protected $fillable = ['total', 'expires_at', 'chat_group_id'];
    protected $dates = ['expires_at', 'deleted_at'];

    public function hasInvitation()
    {
        /** @var Carbon $expiresAt */
        $expiresAt = $this->expires_at;
        $expiresAt->hour(23);
        $expiresAt->minute(59);
        $expiresAt->second(59);
        return $this->remaining > 0 &&
            (!$this->expires_at or (new Carbon())->lessThanOrEqualTo($expiresAt));
    }

    public function chatGroup()
    {
        return $this->belongsTo(ChatGroup::class);
    }

    public function userInvitations()
    {
        return $this->hasMany(ChatGroupInvitationUser::class);
    }
}
