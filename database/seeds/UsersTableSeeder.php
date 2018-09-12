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
                    'firebase_uid' => '',
                    'phone_number' => '+16505551234',
                    'photo' => $this->getAdminPhoto()
                ]);
                User::unguard();
                $user->profile->firebase_uid = 'JwzKYV7y4dPBxbFqXA5b3E2Qkhg2';
                $user->profile->save();
            });

        factory(User::class, 1)
            ->create([
                'email' => 'customer@user.com',
                'role' => User::ROLE_CUSTOMER
            ])->each(function (User $user) {
                User::reguard();
                $user->updateWithProfile([
                    'phone_number' => '+16505551235',
                ]);
                User::unguard();

                $user->profile->firebase_uid = 'wizu6h3clUYAZyQ1J4LFjF66mOv2';
                $user->profile->save();
            });

        factory(User::class, 20)
            ->create(['role' => User::ROLE_CUSTOMER])
            ->each(function (User $user, $key) {
                $user->profile->phone_number = "+165055510{$key}";
                $user->profile->firebase_uid = "user-{$key}";
                $user->profile->save();
            });

    }

    public function getAdminPhoto()
    {
        return new \Illuminate\Http\UploadedFile(
            storage_path('app/faker/users/ninja-496.png'),
            str_random(16) . '.png'
        );
    }
}
