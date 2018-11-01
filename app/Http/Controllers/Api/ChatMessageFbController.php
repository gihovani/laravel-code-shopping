<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Firebase\ChatMessageFb;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ChatMessageFbRequest;
use CodeShopping\Models\ChatGroup;

class ChatMessageFbController extends Controller
{
    public function store(ChatMessageFbRequest $request, ChatGroup $chat_group)
    {
        $chatMessage = new ChatMessageFb();
        $chatMessage->create([
                'user' => \Auth::guard('api')->user(),
                'chat_group' => $chat_group
            ] + $request->all());
        return response()->json([], 204);
    }
}
