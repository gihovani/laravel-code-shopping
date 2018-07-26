<?php

namespace CodeShopping\Common;

use Illuminate\Database\Eloquent\Builder;


trait OnlyTrashed
{
    protected function onlyTrashedIfRequested(Builder $query) : Builder
    {
        if (\Request::get('trashed') == '1') {
            $query = $query->onlyTrashed();
        }
        return $query;
    }
}