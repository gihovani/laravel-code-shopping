<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ProductInputRequest;
use CodeShopping\Http\Resources\ProductInputResource;
use CodeShopping\Models\ProductInput;

class ProductInputController extends Controller
{
    public function store(ProductInputRequest $request) {
        $input = ProductInput::create($request->all());
        return response()->json(new ProductInputResource($input), 201);
    }
    public function index() {
        $inputs = ProductInput::with('product')->paginate();
        return ProductInputResource::collection($inputs);
    }
    public function show(ProductInput $product_input) {
        return new ProductInputResource($product_input);
    }
}
