<?php

use Illuminate\Database\Seeder;

class ProductOutputsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $inputs = \CodeShopping\Models\ProductInput::all();
        factory(\CodeShopping\Models\ProductOutput::class, 4)
            ->make()
            ->each(function($output) use ($inputs) {
                $input = $inputs->random();
                $output->product_id = $input->product->id;
                $output->save();
            });
    }
}
