<?php

use CodeShopping\Models\User;
use CodeShopping\Models\UserProfile;
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
        \File::deleteDirectory(UserProfile::photoPath(), true);
        factory(User::class, 1)
            ->create(['email' => 'admin@user.com'])
            ->each(function (User $user) {
                User::reguard();
                $user->updateWithProfile([
                    'phone_number' => '+16505551234',
                    'photo' => $this->getAdminPhoto()
                ]);
                User::unguard();
            });

        factory(User::class, 1)
            ->create(['email' => 'customer@user.com', 'role' => User::ROLE_CUSTOMER])
            ->each(function (User $user) {
                User::reguard();
                $user->updateWithProfile([
                    'phone_number' => '+16505551235',
                ]);
                User::unguard();
            });

        factory(User::class, 20)
            ->create(['role' => User::ROLE_CUSTOMER]);

    }

    public function getAdminPhoto()
    {
        return new \Illuminate\Http\UploadedFile(
            storage_path('app/faker/users/ninja-496.png'),
            str_random(16) . '.png'
        );
    }
}
