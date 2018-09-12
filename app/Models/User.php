<?php

namespace CodeShopping\Models;

use CodeShopping\Firebase\FirebaseSync;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable, SoftDeletes, Filterable, FirebaseSync;

    const ROLE_SELLER = 1;
    const ROLE_CUSTOMER = 2;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $dates = ['deleted_at'];

    public static function createCustomer($attributes = array()): User
    {
        try {
            UserProfile::uploadFile($attributes['photo']);
            \DB::beginTransaction();
            $user = self::createCustomerUser($attributes);
            UserProfile::saveProfile($user, $attributes);
            \DB::commit();
        } catch (\Exception $e) {
            //excluir a foto
            \DB::rollBack();
            throw $e;
        }
        return $user;
    }

    private static function createCustomerUser($attributes = array()): User
    {
        $attributes['password'] = \Hash::make(str_random(8));
        $user = User::create($attributes);
        $user->role = User::ROLE_CUSTOMER;
        $user->save();

        return $user;
    }

    public function updateWithProfile($attributes = array()): User
    {
        try {
            if (isset($attributes['photo'])) {
                UserProfile::uploadFile($attributes['photo']);
            }
            \DB::beginTransaction();
            $this->fill($attributes);
            $this->save();
            UserProfile::saveProfile($this, $attributes);
            \DB::commit();
        } catch (\Exception $e) {
            if (isset($attributes['photo'])) {
                //excluir a foto
                UserProfile::deleteFile($attributes['photo']);
            }
            \DB::rollBack();
            throw $e;
        }
        return $this;
    }

    public function fill(array $attributes)
    {
        (!isset($attributes['password'])) ?: $attributes['password'] = \Hash::make($attributes['password']);
        return parent::fill($attributes);
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->id;
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'profile' => [
                'has_photo' => $this->profile->photo ? true : false,
                'photo_url' => $this->profile->photo_url,
                'phone_number' => $this->profile->phone_number
            ]
        ];
    }

    public function profile()
    {
        return $this->hasOne(UserProfile::class)->withDefault();
    }

    protected function syncFbRemove()
    {
        $this->syncFbSetCustom();
    }

    protected function syncFbSet()
    {
        $this->syncFbSetCustom();
    }

    public function syncFbSetCustom()
    {
        $this->profile->refresh();
        if ($this->profile->firebase_uid) {
            $database = $this->getFirebaseDatabase();
            $path = '/users/' . $this->profile->firebase_uid;
            $reference = $database->getReference($path);
            $reference->set([
                'name' => $this->name,
                'photo_url' => $this->profile->photo_url_base,
                'deleted_at' => $this->deleted_at
            ]);
        }
    }
}
