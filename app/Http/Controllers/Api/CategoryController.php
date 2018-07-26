<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Common\OnlyTrashed;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Filters\CategoryFilter;
use CodeShopping\Http\Requests\CategoryRequest;
use CodeShopping\Http\Resources\CategoryResource;
use CodeShopping\Models\Category;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
class CategoryController extends Controller
{
    use OnlyTrashed;

    public function index(Request $request)
    {
        /** @var CategoryFilter $filter */
        $filter = app(CategoryFilter::class);
        /** @var Builder $filterQuery */
        $filterQuery = Category::filtered($filter);

        $query = $this->onlyTrashedIfRequested($filterQuery);
        $categories = $request->has('all') ? $query->get() : $query->paginate(5);
        return CategoryResource::collection($categories);
    }

    public function store(CategoryRequest $request)
    {
        $category = Category::create($request->all());
        $category->refresh();
        return response()->json(new CategoryResource($category), 201);
    }

    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    public function update(CategoryRequest $request, Category $category)
    {
        $category->fill($request->all());
        $category->save();
        return new CategoryResource($category);
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json([], 204);
    }
}
