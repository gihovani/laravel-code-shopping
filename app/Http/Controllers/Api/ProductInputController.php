<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ProductInputRequest;
use CodeShopping\Http\Resources\ProductInputResource;
use CodeShopping\Models\Product;
use CodeShopping\Models\ProductInput;

class ProductInputController extends Controller
{
    public function store(ProductInputRequest $request, Product $product) {
        ProductInput::create(['product_id' => $product->id, 'amount' => $request->amount]);
        $product->stock += $request->amount;
        $product->save();
        return response()->json(new ProductInputResource($product), 201);
    }
    public function index(Product $product) {
        return new ProductInputResource($product);
    }
}
