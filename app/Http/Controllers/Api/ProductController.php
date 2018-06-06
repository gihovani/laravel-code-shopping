<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ProductRequest;
use CodeShopping\Http\Resources\ProductResource;
use CodeShopping\Models\Product;
use Illuminate\Database\Eloquent\Builder;

class ProductController extends Controller
{
    public function index()
    {
        $query = Product::query();
        $query = $this->onlyTrashedIfRequested($query);
        $products = $query->paginate(10);
        return ProductResource::collection($products);
    }

    public function store(ProductRequest $request)
    {
        $product = Product::create($request->all());
        $product->refresh();

        return response()->json(new ProductResource($product), 201);
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $product->fill($request->all());
        $product->save();
        return new ProductResource($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json([], 204);
    }

    private function onlyTrashedIfRequested(Builder $builder)
    {
        if (\Request::get('trashed') == 1) {
            $builder = $builder->onlyTrashed();
        }
        return $builder;
    }
}
