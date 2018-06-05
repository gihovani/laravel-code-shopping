<?php

namespace CodeShopping\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;

class ProductPhoto extends Model
{
    const BASE_PATH = 'app/public';
    const DIR_PRODUCTS = 'products';

    const PRODUCTS_PATH = self::BASE_PATH . '/' . self::DIR_PRODUCTS;

    public $fillable = ['file_name', 'product_id'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public static function photosPath($productId)
    {
        $path = self::PRODUCTS_PATH . '/' . $productId;
        return storage_path($path);
    }

    public static function uploadFiles($productId, array $files)
    {
        $dir = self::photosDir($productId);
        /** @var UploadedFile $file */
        foreach ($files as $file) {
            $file->store($dir, ['disk' => 'public']);
        }
    }

    public static function photosDir($productId)
    {
        $dir = self::DIR_PRODUCTS . '/' . $productId;
        return $dir;
    }
}
