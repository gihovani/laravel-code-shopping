<?php

namespace CodeShopping\Common;

use Illuminate\Database\Eloquent\Builder;

trait QueryRangeFilter
{
    protected function rangeFilter(Builder $query, $field, $values) {
        $value = explode('|', $values);
        if (count($value) > 0) {
            $query->where($field, '>=', $value[0]);
        }
        if (count($value) > 1) {
            $query->where($field, '<=', $value[1]);
        }
        return $query;
    }
}