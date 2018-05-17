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
        factory(\CodeShopping\Models\Product::class, 100)->create()->each(function($product) use($categories) {
            $product->categories()->attach($categories->random()->id);
        });
    }
}
