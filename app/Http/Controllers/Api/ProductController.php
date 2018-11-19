<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Common\OnlyTrashed;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Filters\ProductFilter;
use CodeShopping\Http\Requests\ProductRequest;
use CodeShopping\Http\Resources\ProductResource;
use CodeShopping\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;


class ProductController extends Controller
{
    use OnlyTrashed;

    public function index(Request $request)
    {
        /** @var ProductFilter $filter */
        $filter = app(ProductFilter::class);
        /** @var Builder $filterQuery */
        $filterQuery = Product::filtered($filter);

        $query = $this->onlyTrashedIfRequested($filterQuery);
        $products = $this->hasFilterParameter($request) ?
            $query->get() :
            $query->paginate();
        return ProductResource::collection($products);
    }

    private function hasFilterParameter(Request $request)
    {
        return $request->get('search') && $request->has('all');
    }

    public function store(ProductRequest $request)
    {
        $product = Product::createWithPhoto($request->all());
        $product->refresh();

        return response()->json(new ProductResource($product), 201);
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $product->updateWithPhoto($request->all());
        return new ProductResource($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json([], 204);
    }

    public function restore(Product $product)
    {
        $product->restore();
        return response()->json([], 204);
    }
}
