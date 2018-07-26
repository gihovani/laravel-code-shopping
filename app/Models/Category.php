<?php

namespace CodeShopping\Models;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;

class Category extends Model
{
    use Sluggable, Filterable, SoftDeletes;
    protected $fillable = [
        'name',
        'active'
    ];

    protected $dates = ['deleted_at'];
    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    public function products() {
        return $this->belongsToMany(Product::class);
    }
}
