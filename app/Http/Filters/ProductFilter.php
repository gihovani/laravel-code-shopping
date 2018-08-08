<?php

namespace CodeShopping\Http\Filters;

use CodeShopping\Common\QueryRangeFilter;
use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class ProductFilter extends SimpleQueryFilter
{
    use QueryRangeFilter;

    protected $simpleFilters = ['search', 'interval', 'price'];
    protected $simpleSorts = ['id', 'name', 'price', 'stock', 'created_at'];

    protected function applySearch($value)
    {
        $this->query
            ->where('name', 'LIKE', "%$value%")
            ->orWhere('description', 'LIKE', "%$value%");
    }

    protected function applyPrice($value)
    {
        $this->query = $this->rangeFilter($this->query, 'price', $value);
    }

    protected function applyInterval($value)
    {
        $this->query = $this->rangeFilter($this->query, 'created_at', $value);
    }
}