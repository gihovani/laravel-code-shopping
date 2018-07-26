<?php

namespace CodeShopping\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;

class Product extends Model
{
    use Sluggable, SoftDeletes, Filterable;

    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'active',
    ];

    protected $dates = ['deleted_at'];

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
