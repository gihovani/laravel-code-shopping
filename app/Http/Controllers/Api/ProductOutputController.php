<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Filters\ProductOutputFilter;
use CodeShopping\Http\Requests\ProductOutputRequest;
use CodeShopping\Http\Resources\ProductOutputResource;
use CodeShopping\Models\ProductOutput;
use Illuminate\Database\Eloquent\Builder;

class ProductOutputController extends Controller
{
    public function index()
    {
        /** @var ProductOutputFilter $filter */
        $filter = app(ProductOutputFilter::class);
        /** @var Builder $queryFilter */
        $queryFilter = ProductOutput::with('product')->filtered($filter);
        $outputs = $queryFilter->paginate();
        return ProductOutputResource::collection($outputs);
    }

    public function store(ProductOutputRequest $request)
    {
        $input = ProductOutput::create($request->all());
        return response()->json(new ProductOutputResource($input), 201);
    }

    public function show(ProductOutput $product_output)
    {
        return new ProductOutputResource($product_output);
    }
}
