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
        $firebase_uid = \Auth::guard('api')->user()->profile->firebase_uid;
        $chatMessage = new ChatMessageFb();
        $chatMessage->create([
                'firebase_uid' => $firebase_uid,
                'chat_group' => $chat_group
            ] + $request->all());
        return response()->json([], 204);
    }
}
