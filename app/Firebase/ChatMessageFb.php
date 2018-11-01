<?php
/**
 * Created by PhpStorm.
 * User: gihovani.demetrio
 * Date: 24/09/2018
 * Time: 10:12
 */

namespace CodeShopping\Firebase;


use CodeShopping\Events\ChatMessageSentEvent;
use CodeShopping\Models\ChatGroup;
use Illuminate\Http\UploadedFile;

class ChatMessageFb
{
    use FirebaseSync;
    /** @var ChatGroup $chatGroup */
    private $chatGroup;

    public function create(array $attributes)
    {
        $this->chatGroup = $attributes['chat_group'];
        $type = $attributes['type'];
        switch ($type) {
            case 'audio':
            case 'image':
                /** @var UploadedFile $uploadedFile */
                $uploadedFile = $attributes['content'];
                $this->upload($uploadedFile);
                $fileUrl = $this->groupFilesDir() . '/' . $this->buildFileName($uploadedFile);
                $attributes['content'] = $fileUrl;
                break;
        }

        $reference = $this->getMessageReference();
        $newReference = $reference->push([
            'type' => $attributes['type'],
            'content' => $attributes['content'],
            'created_at' => ['.sv' => 'timestamp'],
            'user_id' => $attributes['user']->profile->firebase_uid
        ]);
        $this->setLastMessage($newReference->getKey());
        $this->chatGroup->updateInFb();

        if (!(app()->runningInConsole() && app()->runningUnitTests())) {
            event(new ChatMessageSentEvent($this->chatGroup, $attributes['type'], $attributes['content'], $attributes['user']));
        }
    }

    private function upload(UploadedFile $file)
    {
        $file->storeAs($this->groupFilesDir(), $this->buildFileName($file), ['disk' => 'public']);
    }

    private function buildFileName(UploadedFile $file)
    {
        if ($file->getMimeType() === 'audio/x-hx-aac-adts')
            return "{$file->hashName()}aac";

        return $file->hashName();
    }

    private function groupFilesDir()
    {
        return ChatGroup::DIR_CHAT_GROUPS . '/' . $this->chatGroup->id . '/messages_files';
    }

    public function deleteMessages(ChatGroup $chatGroup)
    {
        $this->chatGroup = $chatGroup;
        $this->getMessageReference()->remove();
    }

    public function setLastMessage($messageUid)
    {
        $path = "{$this->getChatGroupMessagesReference()}/last_message_id";
        $reference = $this->getFirebaseDatabase()->getReference($path);
        $reference->set($messageUid);
    }

    private function getMessageReference()
    {
        $path = "{$this->getChatGroupMessagesReference()}/messages";
        return $this->getFirebaseDatabase()->getReference($path);
    }

    private function getChatGroupMessagesReference()
    {
        return "/chat_groups_messages/{$this->chatGroup->id}";
    }
}