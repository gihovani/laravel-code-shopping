<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ProductPhotoRequest;
use CodeShopping\Http\Resources\ProductPhotoCollection;
use CodeShopping\Http\Resources\ProductPhotoResource;
use CodeShopping\Models\Product;
use CodeShopping\Models\ProductPhoto;

class ProductPhotoController extends Controller
{
    public function index(Product $product)
    {
        return new ProductPhotoCollection($product->photos, $product);
    }

    public function store(ProductPhotoRequest $request, Product $product)
    {
        $photo = ProductPhoto::createWithPhotosFiles($product->id, $request->photos);
        return response()->json(new ProductPhotoResource($photo), 201);
    }

    public function show(Product $product, ProductPhoto $photo)
    {
        $this->assertProductPhoto($product, $photo);
        return new ProductPhotoResource($photo);
    }

    public function update(ProductPhotoRequest $request, Product $product, ProductPhoto $photo)
    {
        $this->assertProductPhoto($product, $photo);
        $photo = $photo->updateWithPhoto($request->photo);
        return new ProductPhotoResource($photo);
    }

    public function destroy(Product $product, ProductPhoto $photo)
    {
        $this->assertProductPhoto($product, $photo);
        $photo->deleteWithPhoto();
        return response([], 204);
    }

    private function assertProductPhoto(Product $product, ProductPhoto $photo)
    {
        if ($product->id != $photo->product_id) {
            abort(404);
        }
    }
}
