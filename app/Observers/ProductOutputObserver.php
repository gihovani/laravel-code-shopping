<?php

namespace CodeShopping\Observers;

class ProductOutputObserver
{
    public function created($output)
    {
        $product = $output->product;
        $product->stock -= $output->amount;
        if ($product->stock < 0) {
            throw new \Exception("Estoque de {$product->name} não pode ser negativo");
        }
        $product->save();
    }

}