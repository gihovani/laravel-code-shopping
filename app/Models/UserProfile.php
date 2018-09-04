<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;

class UserProfile extends Model
{
    const BASE_PATH = 'app/public';
    const DIR_USERS = 'users';
    const DIR_USER_PHOTO = self::DIR_USERS . '/photos';

    const USER_PHOTO_PATH = self::BASE_PATH . '/' . self::DIR_USER_PHOTO;

    protected $fillable = ['photo', 'phone_number'];

    public static function saveProfile(User $user, $attributes = array())
    {
        if (array_key_exists('photo', $attributes)) {
            self::deletePhoto($user->profile);
            $attributes['photo'] = UserProfile::getPhotoHashName($attributes['photo']);
        }
        $user->profile->fill($attributes)->save();
        return $user->profile;
    }

    private static function getPhotoHashName(UploadedFile $photo = null)
    {
        return $photo ? $photo->hashName() : null;
    }

    private static function deletePhoto(UserProfile $profile)
    {
        if (!$profile->photo) {
            return;
        }

        $path = self::photoDir();
        \Storage::disk('public')
            ->delete("{$path}/{$profile->photo}");
    }

    public static function uploadFile(UploadedFile $file = null)
    {
        if (!$file) return;

        $dir = self::photoDir();
        $file->store($dir, ['disk' => 'public']);
    }

    public static function deleteFile(UploadedFile $file = null)
    {
        if (!$file) return;

        $path = self::photoDir();
        \Storage::disk('public')
            ->delete("{$path}/{$file->hashName()}");
    }

    public static function photoDir()
    {
        $dir = self::DIR_USER_PHOTO;
        return $dir;
    }

    public static function photoPath()
    {
        return storage_path(self::USER_PHOTO_PATH);
    }

    public function getPhotoUrlAttribute()
    {
        $path = self::photoDir();
        return $this->photo ?
            asset('storage/' . $path . '/' . $this->photo) :
            'https://www.gravatar.com/avatar/nouser.jpg';
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
