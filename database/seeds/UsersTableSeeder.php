<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\CodeShopping\Models\User::class, 1)->create(['email' => 'admin@user.com']);
        factory(\CodeShopping\Models\User::class, 50)->create();
    }
}
