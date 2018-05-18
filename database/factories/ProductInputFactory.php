<?php

use Faker\Generator as Faker;

$factory->define(\CodeShopping\Models\ProductInput::class, function (Faker $faker) {
    return [
        'amount' => $faker->numberBetween(1, 100)
    ];
});
