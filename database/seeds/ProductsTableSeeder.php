<?php

use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = \CodeShopping\Models\Category::all();
        factory(\CodeShopping\Models\Product::class, 100)->make()->each(function($product) use($categories) {
            $stock = rand(0, 100);
            $product->stock = $stock;
            $product->save();

            $product->categories()->attach($categories->random()->id);
            $product->inputs()->create(['amount' => $stock]);
        });
    }
}
