<?php

namespace CodeShopping\Http\Filters;

use CodeShopping\Common\QueryRangeFilter;
use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class CategoryFilter extends SimpleQueryFilter
{
    use QueryRangeFilter;

    protected $simpleFilters = ['search', 'interval'];
    protected $simpleSorts = ['id', 'name', 'created_at'];

    protected function applySearch($value) {
        $this->query->where('name', 'LIKE', "%$value%");
    }

    protected function applyInterval($value) {
        $this->query = $this->rangeFilter($this->query, 'created_at', $value);
    }
}