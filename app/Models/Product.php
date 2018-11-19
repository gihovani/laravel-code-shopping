<?php

namespace CodeShopping\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\UploadedFile;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;

class Product extends Model
{
    use Sluggable, SoftDeletes, Filterable;

    protected $dates = ['deleted_at'];
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'active',
        'photo',
    ];

    const BASE_PATH = 'app/public';
    const DIR_PRODUCTS = 'products';
    const PRODUCTS_PATH = self::BASE_PATH . '/' . self::DIR_PRODUCTS;

    public static function createWithPhoto($attributes = array()): Product
    {
        try {
            \DB::beginTransaction();
            self::uploadPhoto($attributes['photo']);
            $attributes['photo'] = $attributes['photo']->hashName();
            $product = self::create($attributes);
            \DB::commit();
            return $product;
        } catch (\Exception $e) {
            self::deleteFile($attributes['photo']);
            \DB::rollBack();
            throw $e;
        }
    }

    public function updateWithPhoto(array $attributes = []): Product
    {
        try {
            if (isset($attributes['photo'])) {
                self::uploadPhoto($attributes['photo']);
                $this->deletePhoto();
                $attributes['photo'] = $attributes['photo']->hashName();
            }
            \DB::beginTransaction();
            $this->fill($attributes)->save();
            \DB::commit();
            return $this;
        } catch (\Exception $e) {
            if (isset($attributes['photo'])) {
                self::deleteFile($attributes['photo']);
            }
            \DB::rollBack();
            throw $e;
        }
    }

    private function deletePhoto()
    {
        $dir = self::photoDir();
        \Storage::disk('public')->delete("{$dir}/{$this->photo}");
    }

    private static function deleteFile(UploadedFile $photo)
    {
        $path = self::photoPath();
        $photoPath = "{$path}/{$photo->hashName()}";
        if (file_exists($photoPath)) {
            \File::delete($photoPath);
        }
    }

    public static function photoPath()
    {
        $path = self::PRODUCTS_PATH;
        return storage_path($path);
    }

    public static function uploadPhoto(UploadedFile $photo)
    {
        $dir = self::photoDir();
        $photo->store($dir, ['disk' => 'public']);
    }

    public function getPhotoUrlAttribute()
    {
        return asset("storage/{$this->photo_url_without_asset}");
    }

    public function getPhotoUrlWithoutAssetAttribute()
    {
        $path = self::photoDir();
        return "{$path}/{$this->photo}";
    }

    public static function photoDir()
    {
        return self::DIR_PRODUCTS;
    }

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function inputs()
    {
        return $this->hasMany(ProductInput::class);
    }

    public function photos()
    {
        return $this->hasMany(ProductPhoto::class);
    }
}
