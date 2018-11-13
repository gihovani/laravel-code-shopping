<?php

namespace CodeShopping\Models;

use CodeShopping\Exceptions\ChatGroupInvitationUserException;
use Illuminate\Database\Eloquent\Model;

class ChatGroupInvitationUser extends Model
{
    const STATUS_PENDING = 1;
    const STATUS_APPROVED = 2;
    const STATUS_REPROVED = 3;

    protected $fillable = ['chat_group_invitation_id', 'user_id'];

    public static function createIfAllowed(ChatGroupInvitation $invitation, User $user)
    {
        self::throwIfNotAllowed($invitation, $user);
        $attributes = ['chat_group_invitation_id' => $invitation->id, 'user_id' => $user->id];
        return self::create($attributes);
    }

    private static function throwIfNotAllowed(ChatGroupInvitation $invitation, User $user)
    {
        if (!$invitation->hasInvitation()) {
            throw new ChatGroupInvitationUserException('Ingresso no grupo não permitido.', ChatGroupInvitationUserException::ERROR_NOT_INVITATION);
        }

        if ($user->role == User::ROLE_SELLER) {
            throw new ChatGroupInvitationUserException('Vendedor não precisa ingressar em um grupo.', ChatGroupInvitationUserException::ERROR_HAS_SELLER);
        }

        if (self::isMember($invitation->chatGroup, $user)) {
            throw new ChatGroupInvitationUserException('Usuário já é membro deste grupo.', ChatGroupInvitationUserException::ERROR_IS_MEMBER);
        }

        if (self::hasStored($invitation, $user)) {
            throw new ChatGroupInvitationUserException('Usuário já cadastrou um convite.', ChatGroupInvitationUserException::ERROR_HAS_STORED);
        }
    }

    private static function isMember(ChatGroup $chatGroup, User $user)
    {
        return $chatGroup->users()->where('id', $user->id)->exists();
    }

    private static function hasStored(ChatGroupInvitation $invitation, User $user)
    {
        return $invitation->userInvitations()->where('user_id', $user->id)->exists();
    }

    public function chatGroupInvitation()
    {
        return $this->belongsTo(ChatGroupInvitation::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
