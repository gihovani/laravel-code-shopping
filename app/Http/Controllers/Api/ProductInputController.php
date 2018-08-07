<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Filters\ProductInputFilter;
use CodeShopping\Http\Requests\ProductInputRequest;
use CodeShopping\Http\Resources\ProductInputResource;
use CodeShopping\Models\ProductInput;
use Illuminate\Database\Eloquent\Builder;

class ProductInputController extends Controller
{
    public function index() {
        /** @var ProductInputFilter $filter */
        $filter = app(ProductInputFilter::class);
        /** @var Builder $queryFilter */
        $queryFilter = ProductInput::with('product')->filtered($filter);
        $inputs = $queryFilter->paginate();
        return ProductInputResource::collection($inputs);
    }
    public function store(ProductInputRequest $request) {
        $input = ProductInput::create($request->all());
        return response()->json(new ProductInputResource($input), 201);
    }
    public function show(ProductInput $product_input) {
        return new ProductInputResource($product_input);
    }
}
