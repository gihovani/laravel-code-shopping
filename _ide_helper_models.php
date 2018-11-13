<?php
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace CodeShopping\Models{
/**
 * CodeShopping\Models\Category
 *
 * @property int $active
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $deleted_at
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\CodeShopping\Models\Product[] $products
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Category filtered(\Mnabialek\LaravelEloquentFilter\Contracts\QueryFilter $filter)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Category findSimilarSlugs($attribute, $config, $slug)
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\CodeShopping\Models\Category onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Category whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Category whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Category whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Category whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Category whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Category whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Category whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\CodeShopping\Models\Category withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\CodeShopping\Models\Category withoutTrashed()
 */
	class Category extends \Eloquent {}
}

namespace CodeShopping\Models{
/**
 * CodeShopping\Models\UserProfile
 *
 * @property \Carbon\Carbon|null $created_at
 * @property string|null $device_token
 * @property string|null $firebase_uid
 * @property int $id
 * @property string $phone_number
 * @property string|null $phone_number_token_to_change
 * @property string|null $photo
 * @property \Carbon\Carbon|null $updated_at
 * @property int $user_id
 * @property-read mixed $photo_url
 * @property-read mixed $photo_url_base
 * @property-read \CodeShopping\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\UserProfile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\UserProfile whereDeviceToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\UserProfile whereFirebaseUid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\UserProfile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\UserProfile wherePhoneNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\UserProfile wherePhoneNumberTokenToChange($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\UserProfile wherePhoto($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\UserProfile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\UserProfile whereUserId($value)
 */
	class UserProfile extends \Eloquent {}
}

namespace CodeShopping\Models{
/**
 * CodeShopping\Models\ChatGroup
 *
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $deleted_at
 * @property int $id
 * @property string $name
 * @property string $photo
 * @property \Carbon\Carbon|null $updated_at
 * @property-read mixed $photo_url
 * @property-read mixed $photo_url_base
 * @property-read \Illuminate\Database\Eloquent\Collection|\CodeShopping\Models\ChatGroupInvitation[] $linkInvitations
 * @property-read \Illuminate\Database\Eloquent\Collection|\CodeShopping\Models\ChatGroupInvitationUser[] $userInvitations
 * @property-read \Illuminate\Database\Eloquent\Collection|\CodeShopping\Models\User[] $users
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\CodeShopping\Models\ChatGroup onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ChatGroup whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ChatGroup whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ChatGroup whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ChatGroup whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ChatGroup wherePhoto($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ChatGroup whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\CodeShopping\Models\ChatGroup withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\CodeShopping\Models\ChatGroup withoutTrashed()
 */
	class ChatGroup extends \Eloquent {}
}

namespace CodeShopping\Models{
/**
 * CodeShopping\Models\ChatGroupInvitationUser
 *
 * @property int $chat_group_invitation_id
 * @property \Carbon\Carbon|null $created_at
 * @property int $id
 * @property int $status
 * @property \Carbon\Carbon|null $updated_at
 * @property int $user_id
 * @property-read \CodeShopping\Models\ChatGroupInvitation $chatGroupInvitation
 * @property-read \CodeShopping\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ChatGroupInvitationUser whereChatGroupInvitationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ChatGroupInvitationUser whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ChatGroupInvitationUser whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ChatGroupInvitationUser whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ChatGroupInvitationUser whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ChatGroupInvitationUser whereUserId($value)
 */
	class ChatGroupInvitationUser extends \Eloquent {}
}

namespace CodeShopping\Models{
/**
 * CodeShopping\Models\Product
 *
 * @property int $active
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $deleted_at
 * @property string $description
 * @property int $id
 * @property string $name
 * @property float $price
 * @property string $slug
 * @property int $stock
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\CodeShopping\Models\Category[] $categories
 * @property-read \Illuminate\Database\Eloquent\Collection|\CodeShopping\Models\ProductInput[] $inputs
 * @property-read \Illuminate\Database\Eloquent\Collection|\CodeShopping\Models\ProductPhoto[] $photos
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Product filtered(\Mnabialek\LaravelEloquentFilter\Contracts\QueryFilter $filter)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Product findSimilarSlugs($attribute, $config, $slug)
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\CodeShopping\Models\Product onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Product whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Product whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Product whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Product whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Product whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Product whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Product wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Product whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Product whereStock($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Product whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\CodeShopping\Models\Product withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\CodeShopping\Models\Product withoutTrashed()
 */
	class Product extends \Eloquent {}
}

namespace CodeShopping\Models{
/**
 * CodeShopping\Models\ProductPhoto
 *
 * @property \Carbon\Carbon|null $created_at
 * @property string $file_name
 * @property int $id
 * @property int $product_id
 * @property \Carbon\Carbon|null $updated_at
 * @property-read mixed $photo_url
 * @property-read \CodeShopping\Models\Product $product
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ProductPhoto whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ProductPhoto whereFileName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ProductPhoto whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ProductPhoto whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ProductPhoto whereUpdatedAt($value)
 */
	class ProductPhoto extends \Eloquent {}
}

namespace CodeShopping\Models{
/**
 * CodeShopping\Models\User
 *
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $deleted_at
 * @property string $email
 * @property int $id
 * @property string $name
 * @property string $password
 * @property string|null $remember_token
 * @property int $role
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read \CodeShopping\Models\UserProfile $profile
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\User filtered(\Mnabialek\LaravelEloquentFilter\Contracts\QueryFilter $filter)
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\CodeShopping\Models\User onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\User whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\User whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\CodeShopping\Models\User withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\CodeShopping\Models\User withoutTrashed()
 */
	class User extends \Eloquent {}
}

namespace CodeShopping\Models{
/**
 * CodeShopping\Models\ProductInput
 *
 * @property int $amount
 * @property \Carbon\Carbon|null $created_at
 * @property int $id
 * @property int $product_id
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \CodeShopping\Models\Product $product
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ProductInput filtered(\Mnabialek\LaravelEloquentFilter\Contracts\QueryFilter $filter)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ProductInput whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ProductInput whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ProductInput whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ProductInput whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ProductInput whereUpdatedAt($value)
 */
	class ProductInput extends \Eloquent {}
}

namespace CodeShopping\Models{
/**
 * CodeShopping\Models\ChatGroupInvitation
 *
 * @property int $chat_group_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $deleted_at
 * @property \Carbon\Carbon|null $expires_at
 * @property int $id
 * @property int $remaining
 * @property string $slug
 * @property int $total
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \CodeShopping\Models\ChatGroup $chatGroup
 * @property-read \Illuminate\Database\Eloquent\Collection|\CodeShopping\Models\ChatGroupInvitationUser[] $userInvitations
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\CodeShopping\Models\ChatGroupInvitation onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ChatGroupInvitation whereChatGroupId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ChatGroupInvitation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ChatGroupInvitation whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ChatGroupInvitation whereExpiresAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ChatGroupInvitation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ChatGroupInvitation whereRemaining($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ChatGroupInvitation whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ChatGroupInvitation whereTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ChatGroupInvitation whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\CodeShopping\Models\ChatGroupInvitation withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\CodeShopping\Models\ChatGroupInvitation withoutTrashed()
 */
	class ChatGroupInvitation extends \Eloquent {}
}

namespace CodeShopping\Models{
/**
 * CodeShopping\Models\ProductOutput
 *
 * @property int $amount
 * @property \Carbon\Carbon|null $created_at
 * @property int $id
 * @property int $product_id
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \CodeShopping\Models\Product $product
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ProductOutput filtered(\Mnabialek\LaravelEloquentFilter\Contracts\QueryFilter $filter)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ProductOutput whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ProductOutput whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ProductOutput whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ProductOutput whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ProductOutput whereUpdatedAt($value)
 */
	class ProductOutput extends \Eloquent {}
}

