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
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property int $active
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\CodeShopping\Models\Product[] $products
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Category findSimilarSlugs($attribute, $config, $slug)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Category whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Category whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Category whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Category whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Category whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Category whereUpdatedAt($value)
 */
	class Category extends \Eloquent {}
}

namespace CodeShopping\Models{
/**
 * CodeShopping\Models\Product
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string $description
 * @property float $price
 * @property int $stock
 * @property int $active
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\CodeShopping\Models\Category[] $categories
 * @property-read \Illuminate\Database\Eloquent\Collection|\CodeShopping\Models\ProductInput[] $inputs
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Product findSimilarSlugs($attribute, $config, $slug)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Product whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Product whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Product whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Product whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Product whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Product wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Product whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Product whereStock($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\Product whereUpdatedAt($value)
 */
	class Product extends \Eloquent {}
}

namespace CodeShopping\Models{
/**
 * CodeShopping\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string|null $remember_token
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

namespace CodeShopping\Models{
/**
 * CodeShopping\Models\ProductInput
 *
 * @property int $id
 * @property int $product_id
 * @property int $amount
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \CodeShopping\Models\Product $product
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
 * CodeShopping\Models\ProductOutput
 *
 * @property int $id
 * @property int $product_id
 * @property int $amount
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \CodeShopping\Models\Product $product
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ProductOutput whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ProductOutput whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ProductOutput whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ProductOutput whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\CodeShopping\Models\ProductOutput whereUpdatedAt($value)
 */
	class ProductOutput extends \Eloquent {}
}

