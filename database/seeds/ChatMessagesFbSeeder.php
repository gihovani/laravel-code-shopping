<?php

use Illuminate\Database\Seeder;

class ChatMessagesFbSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $chatGroups = \CodeShopping\Models\ChatGroup::all();
        $users = \CodeShopping\Models\User::all();
        $chatMessage = new \CodeShopping\Firebase\ChatMessageFb();
        $chatGroups->each(function ($group) use ($users, $chatMessage) {
            $chatMessage->deleteMessages($group);
            foreach (range(1, 10) as $value) {
                $content = Faker\Factory::create()->sentence(10);
                $type = 'text';

                $chatMessage->create([
                    'chat_group' => $group,
                    'content' => $content,
                    'type' => $type,
                    'firebase_uid' => $users->random()->profile->firebase_uid
                ]);
            }
        });
    }
}
