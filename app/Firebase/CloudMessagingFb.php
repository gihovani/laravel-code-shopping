<?php

namespace CodeShopping\Firebase;

use sngrl\PhpFirebaseCloudMessaging\Client;
use sngrl\PhpFirebaseCloudMessaging\Message;
use sngrl\PhpFirebaseCloudMessaging\Notification;
use sngrl\PhpFirebaseCloudMessaging\Recipient\Device;

class CloudMessagingFb
{
    private $title = '';
    private $body = '';
    private $tokens = [];
    private $data = [];

    public function send()
    {
        $client = new Client();
        $client->setApiKey(env('FB_SERVER_KEY'));

        $message = new Message();
        foreach ($this->tokens as $token) {
            $message->addRecipient(new Device($token));
        }
        $message
            ->setNotification(new Notification($this->title, $this->body))
            ->setData($this->data);
        return $client->send($message);
    }

    /**
     * @param string $title
     * @return CloudMessagingFb
     */
    public function setTitle(string $title): CloudMessagingFb
    {
        $this->title = $title;
        return $this;
    }

    /**
     * @param string $body
     * @return CloudMessagingFb
     */
    public function setBody(string $body): CloudMessagingFb
    {
        $this->body = $body;
        return $this;
    }

    /**
     * @param array $tokens
     * @return CloudMessagingFb
     */
    public function setTokens(array $tokens): CloudMessagingFb
    {
        $this->tokens = $tokens;
        return $this;
    }

    /**
     * @param array $data
     * @return CloudMessagingFb
     */
    public function setData(array $data): CloudMessagingFb
    {
        $this->data = $data;
        return $this;
    }
}