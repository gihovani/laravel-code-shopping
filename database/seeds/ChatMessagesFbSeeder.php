<?php

use Illuminate\Database\Seeder;

class ChatMessagesFbSeeder extends Seeder
{
    private $allFakerFiles;
    private $fakerFilesPath = 'app/faker/chat_message_files';
    protected $numMessages = 10;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->allFakerFiles = $this->getFakerFiles();
        $chatGroups = $this->getChatGroups();
        $users = \CodeShopping\Models\User::all();
        $chatMessage = new \CodeShopping\Firebase\ChatMessageFb();
        $self = $this;
        $chatGroups->each(function ($group) use ($users, $chatMessage, $self) {
            $chatMessage->deleteMessages($group);
            foreach (range(1, $self->numMessages) as $value) {
                $textOfFile = rand(1, 10) % 2 == 0 ? 'text' : 'file';
                if ($textOfFile === 'text') {
                    $content = Faker\Factory::create()->sentence(10);
                    $type = 'text';
                } else {
                    $content = $self->getUploadedFile();
                    $type = $content->getExtension() === 'wav' ? 'audio' : 'image';
                }

                $chatMessage->create([
                    'chat_group' => $group,
                    'content' => $content,
                    'type' => $type,
                    'firebase_uid' => $users->random()->profile->firebase_uid
                ]);
            }
        });
    }

    protected function getChatGroups() {
        return \CodeShopping\Models\ChatGroup::all();
    }

    private function getFakerFiles(): \Illuminate\Support\Collection
    {
        $path = storage_path($this->fakerFilesPath);
        return collect(\File::allFiles($path));
    }

    private function getUploadedFile()
    {
        /** @var SplFileInfo $file */
        $file = $this->allFakerFiles->random();
        $uploadedFile = new \Illuminate\Http\UploadedFile(
            $file->getRealPath(),
            str_random(16) . '.' . $file->getExtension()
        );
        return $uploadedFile;
    }
}
