<?php

namespace CodeShopping\Models;

use CodeShopping\Firebase\FirebaseSync;
use Fico7489\Laravel\Pivot\Traits\PivotEventTrait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\UploadedFile;

class ChatGroup extends Model
{
    use SoftDeletes, FirebaseSync, PivotEventTrait;

    const BASE_PATH = 'app/public';
    const DIR_CHAT_GROUPS = 'chat_groups';

    const CHAT_GROUP_PHOTO_PATH = self::BASE_PATH . '/' . self::DIR_CHAT_GROUPS;

    protected $fillable = ['name', 'photo'];
    protected $dates = ['deleted_at'];

    public static function createWithPhoto($attributes = array()): ChatGroup
    {
        try {
            self::uploadFile($attributes['photo']);
            $attributes['photo'] = $attributes['photo']->hashName();
            \DB::beginTransaction();
            $chat = self::create($attributes);
            \DB::commit();
        } catch (\Exception $e) {
            //excluir a foto
            self::deleteFile($attributes['photo']);
            \DB::rollBack();
            throw $e;
        }
        return $chat;
    }

    public function updateWithPhoto($attributes = array()): ChatGroup
    {
        try {
            if (isset($attributes['photo'])) {
                self::uploadFile($attributes['photo']);
                $this->deletePhoto();
                $attributes['photo'] = $attributes['photo']->hashName();
            }
            \DB::beginTransaction();
            $this->fill($attributes)->save();
            \DB::commit();
        } catch (\Exception $e) {
            //excluir a foto
            if (isset($attributes['photo'])) {
                self::deleteFile($attributes['photo']);
            }
            \DB::rollBack();
            throw $e;
        }
        return $this;
    }

    public static function uploadFile(UploadedFile $file)
    {
        $dir = self::photoDir();
        $file->store($dir, ['disk' => 'public']);
    }

    public static function deleteFile(UploadedFile $file)
    {
        $path = self::photoDir();
        \Storage::disk('public')
            ->delete("{$path}/{$file->hashName()}");
    }

    private function deletePhoto()
    {
        $path = self::photoDir();
        \Storage::disk('public')
            ->delete("{$path}/{$this->photo}");
    }

    private static function photoPath()
    {
        return storage_path(self::CHAT_GROUP_PHOTO_PATH);
    }

    private static function photoDir()
    {
        $dir = self::DIR_CHAT_GROUPS;
        return $dir;
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }


    protected function syncFbRemove()
    {
        $this->syncFbSet();
    }

    protected function syncFbSet($operation = null)
    {
        $data = $this->toArray();
        $data['photo_url'] = $this->photo_url_base;
        unset($data['photo']);
        $this->setTimestamps($data, $operation);
        $this->getModalReference()->update($data);
    }

    public function updateInFb() {
        $this->syncFbSet(self::$OPERATION_UPDATE);
    }

    public function getPhotoUrlAttribute()
    {
        return asset('storage/' . $this->photo_url_base);
    }

    public function getPhotoUrlBaseAttribute()
    {
        $path = self::photoDir();
        return $path . '/' . $this->photo;
    }

    protected function syncPivotAttached($model, $relationName, $pivotIds, $pivotIdsAttribute)
    {
        $users = User::whereIn('id', $pivotIds)->get();
        $data = [];
        foreach ($users as $user) {
            $key = $this->chatGroupUsersKey($model, $user);
            $data[$key] = true;
        };
        $this->getFirebaseDatabase()->getReference()->update($data);

    }

    protected function syncPivotDetached($model, $relationName, $pivotIds)
    {
        $users = User::whereIn('id', $pivotIds)->get();
        $data = [];
        foreach ($users as $user) {
            $key = $this->chatGroupUsersKey($model, $user);
            $data[$key] = null;
        };
        $this->getFirebaseDatabase()->getReference()->update($data);

    }

    private function chatGroupUsersKey($model, $user)
    {
        return "chat_groups_users/{$model->id}/{$user->profile->firebase_uid}";
    }
}
