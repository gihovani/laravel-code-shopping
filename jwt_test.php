<?php

$header = [
    'alg' => 'HS256',
    'typ' => 'JWT'
];

$header_json = json_encode($header);
echo "Cabecalho json: $header_json" . PHP_EOL;

$header_base64 = base64_encode($header_json);
echo "Cabecalho json: $header_base64". PHP_EOL;
echo PHP_EOL;

$payload = [
    'first_name' => 'Gihovani',
    'last_name' => 'Demetrio',
    'email' => 'gg2@gg2.com.br'
];

$payload_json = json_encode($payload);
echo "Payload json: $payload_json" . PHP_EOL;

$payload_base64 = base64_encode($payload_json);
echo "Payload json: $payload_base64". PHP_EOL;
echo PHP_EOL;


$key = 'ehwiueiuf32#Recwe3#$fweWE';

$signature = hash_hmac('sha256', "$header_base64.$payload_base64", $key, true);
echo "Signature: $signature". PHP_EOL;

$signature_base64 = base64_encode($signature);
echo "Signature JWT: $signature_base64". PHP_EOL;


echo "TOKEN: $header_base64.$payload_base64.$signature_base64" . PHP_EOL;