<?php
/**
 * Created by PhpStorm.
 * User: gihovani.demetrio
 * Date: 24/09/2018
 * Time: 10:12
 */

namespace CodeShopping\Firebase;


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
                $fileUrl = $this->groupFilesDir() . '/' . $uploadedFile->hashName();
                $attributes['content'] = $fileUrl;
                break;
        }

        $reference = $this->getMessageReference();
        $reference->push([
            'type' => $attributes['type'],
            'content' => $attributes['content'],
            'created_at' => ['.sv' => 'timestamp'],
            'user_id' => $attributes['firebase_uid']
        ]);
    }

    private function upload(UploadedFile $file)
    {
        $file->store($this->groupFilesDir(), ['disk' => 'public']);
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

    private function getMessageReference()
    {
        $path = "/chat_groups/{$this->chatGroup->id}/messages";
        return $this->getFirebaseDatabase()->getReference($path);
    }
}