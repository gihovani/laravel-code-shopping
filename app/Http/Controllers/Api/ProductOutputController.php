<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ProductOutputRequest;
use CodeShopping\Http\Resources\ProductOutputResource;
use CodeShopping\Models\ProductOutput;

class ProductOutputController extends Controller
{
    public function store(ProductOutputRequest $request) {
        $input = ProductOutput::create($request->all());
        return response()->json(new ProductOutputResource($input), 201);
    }
    public function index() {
        $outputs = ProductOutput::with('product')->paginate();
        return ProductOutputResource::collection($outputs);
    }
    public function show(ProductOutput $product_output) {
        return new ProductOutputResource($product_output);
    }
}
