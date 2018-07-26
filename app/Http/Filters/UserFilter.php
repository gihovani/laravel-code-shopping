<?php

namespace CodeShopping\Http\Filters;

use CodeShopping\Common\QueryRangeFilter;
use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class UserFilter extends SimpleQueryFilter
{
    use QueryRangeFilter;
    
    protected $simpleFilters = ['search', 'interval'];
    protected $simpleSorts = ['id', 'name', 'email', 'created_at'];

    protected function applySearch($value) {
        $this->query
            ->where('name', 'LIKE', "%$value%")
            ->orWhere('email', 'LIKE', "%$value%");
    }

    protected function applyInterval($value) {
        $this->query = $this->rangeFilter($this->query, 'created_at', $value);
    }
}