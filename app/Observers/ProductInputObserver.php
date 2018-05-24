<?php

namespace CodeShopping\Observers;

class ProductInputObserver
{
    public function created($input)
    {
        $product = $input->product;
        $product->stock += $input->amount;
        $product->save();
    }
}