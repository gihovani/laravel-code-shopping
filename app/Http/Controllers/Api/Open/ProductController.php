<?php

namespace CodeShopping\Http\Controllers\Api\Open;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Filters\Open\ProductFilter;
use CodeShopping\Http\Resources\ProductResource;
use CodeShopping\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        $filter = app(ProductFilter::class);
        $filterQuery = Product::filtered($filter);
        $products = $filterQuery
            ->where('active', true)
            ->where('stock', '>', 0)
            ->paginate();

        return ProductResource::collection($products);
    }
}
