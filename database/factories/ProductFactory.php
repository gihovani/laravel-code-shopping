<?php

use Faker\Generator as Faker;

$factory->define(CodeShopping\Models\Product::class, function (Faker $faker) {
    return [
        'name' => $faker->unique()->streetName,
        'description' => $faker->text(),
        'price' => $faker->randomFloat(2, 100, 100000),
        'stock' => $faker->randomNumber(3)
    ];
});
