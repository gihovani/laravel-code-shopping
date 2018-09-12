<?php

namespace CodeShopping\Http\Filters;

use CodeShopping\Common\QueryRangeFilter;
use CodeShopping\Models\User;
use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class UserFilter extends SimpleQueryFilter
{
    use QueryRangeFilter;

    protected $simpleFilters = ['search', 'interval', 'role'];
    protected $simpleSorts = ['id', 'name', 'email', 'created_at'];

    protected function applyRole($value)
    {
        if ($value == 'customer') {
            $value = User::ROLE_CUSTOMER;
        } elseif ($value == 'seller') {
            $value = User::ROLE_SELLER;
        }
        $this->query->where('role', $value);
    }

    protected function applySearch($value)
    {
        $this->query->where('name', 'LIKE', "%$value%");
    }

    protected function applyInterval($value)
    {
        $this->query = $this->rangeFilter($this->query, 'created_at', $value);
    }
}