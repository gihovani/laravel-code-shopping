<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ChatGroupInvitationRequest;
use CodeShopping\Http\Resources\ChatGroupInvitationCollection;
use CodeShopping\Http\Resources\ChatGroupInvitationResource;
use CodeShopping\Models\ChatGroup;
use CodeShopping\Models\ChatGroupInvitation;

class ChatGroupInvitationController extends Controller
{
    public function index(ChatGroup $chatGroup)
    {
        $linkInvitations = $chatGroup->linkInvitations()->paginate();
        return new ChatGroupInvitationCollection($linkInvitations, $chatGroup);
    }

    public function store(ChatGroupInvitationRequest $request, ChatGroup $chatGroup)
    {
        $request->merge(['chat_group_id' => $chatGroup->id]);
        $linkInvitations = ChatGroupInvitation::create($request->all());
        return new ChatGroupInvitationResource($linkInvitations);
    }

    public function show(ChatGroup $chatGroup, ChatGroupInvitation $linkInvitation)
    {
        $this->assertInvitation($chatGroup, $linkInvitation);
        return new ChatGroupInvitationResource($linkInvitation);
    }

    public function update(ChatGroupInvitationRequest $request, ChatGroup $chatGroup, ChatGroupInvitation $linkInvitation)
    {
        $this->assertInvitation($chatGroup, $linkInvitation);
        $linkInvitation
            ->fill($request->except('chat_group_id'))
            ->save();
        return new ChatGroupInvitationResource($linkInvitation);
    }

    public function destroy(ChatGroup $chatGroup, ChatGroupInvitation $linkInvitation)
    {
        $this->assertInvitation($chatGroup, $linkInvitation);
        $linkInvitation->delete();
        return response()->json([], 204);
    }

    private function assertInvitation(ChatGroup $chatGroup, ChatGroupInvitation $linkInvitations)
    {
        if ($linkInvitations->chat_group_id != $chatGroup->id) {
            abort(404);
        }
    }
}
