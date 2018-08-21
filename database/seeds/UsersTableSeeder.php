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
        factory(\CodeShopping\Models\User::class, 1)
            ->create(['email' => 'admin@user.com'])
            ->each(function ($user) {
                $user->profile->phone_number = '+16505551234';
                $user->profile->save();
            });
        factory(\CodeShopping\Models\User::class, 50)->create();

    }
}
