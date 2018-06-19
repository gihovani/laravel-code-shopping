<?php

namespace CodeShopping\Common;


use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

trait OnlyTrashed
{
    protected function onlyTrashedIfRequested(Builder $query)
    {
        if (\Request::get('trashed') == '1') {
            $query = $query->onlyTrashed();
        }
        return $query;
    }
}