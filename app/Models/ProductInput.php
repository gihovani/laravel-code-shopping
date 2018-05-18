<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;

class ProductInput extends Model
{
    public $fillable = ['amount', 'product_id'];
    public function products() {
        return $this->belongsTo(Product::class);
    }
}
