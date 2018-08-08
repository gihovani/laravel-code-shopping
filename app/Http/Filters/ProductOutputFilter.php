<?php

namespace CodeShopping\Http\Filters;

use CodeShopping\Common\QueryRangeFilter;
use Illuminate\Database\Query\Builder;
use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class ProductOutputFilter extends SimpleQueryFilter
{
    use QueryRangeFilter;

    protected $simpleFilters = ['search', 'interval'];
    protected $simpleSorts = ['id', 'product_name', 'created_at'];

    protected function applySearch($value)
    {
        $this->query->where('products.name', 'LIKE', "%$value%");
    }

    protected function applyInterval($value)
    {
        $this->query = $this->rangeFilter($this->query, 'product_outputs.created_at', $value);
    }

    protected function applySortProductName($order)
    {
        $this->query->orderBy('products.name', $order);
    }

    protected function applySortCreatedAt($order)
    {
        $this->query->orderBy('product_outputs.created_at', $order);
    }

    /**
     * @param Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function apply($query)
    {
        $query = $query
            ->select('product_outputs.*')
            ->join('products', 'products.id', '=', 'product_outputs.product_id');
        return parent::apply($query);
    }
}