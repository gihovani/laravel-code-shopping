<?php

namespace CodeShopping\Models;

use CodeShopping\Firebase\FirebaseSync;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;

class UserProfile extends Model
{
    use FirebaseSync;

    const BASE_PATH = 'app/public';
    const DIR_USERS = 'users';
    const DIR_USER_PHOTO = self::DIR_USERS . '/photos';

    const USER_PHOTO_PATH = self::BASE_PATH . '/' . self::DIR_USER_PHOTO;

    protected $fillable = ['photo', 'phone_number'];

    public static function createTokenToChangePhoneNumber(UserProfile $profile, $phoneNumber): string
    {
        $token = base64_encode($phoneNumber);
        $profile->phone_number_token_to_change = $token;
        $profile->save();
        return $token;
    }

    public static function updatePhoneNumber($token): UserProfile
    {
        $profile = UserProfile::where('phone_number_token_to_change', '=', $token)->firstOrFail();
        $phoneNumber = base64_decode($token);
        $profile->phone_number = $phoneNumber;
        $profile->phone_number_token_to_change = null;
        $profile->save();
        return $profile;
    }

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
        return $this->photo ?
            asset('storage/' . $this->photo_url_base) :
            $this->photo_url_base;
    }

    public function getPhotoUrlBaseAttribute()
    {
        $path = self::photoDir();
        return $this->photo ?
            $path . '/' . $this->photo :
            'https://www.gravatar.com/avatar/nouser.jpg';
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    protected function syncFbSet()
    {
        $this->user->syncFbSetCustom();
    }
}
