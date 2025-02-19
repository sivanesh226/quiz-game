<?php
require __DIR__ . '/../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secret_key = "your_secret_key";

function generate_jwt($payload) {
    global $secret_key;
    return JWT::encode($payload, $secret_key, 'HS256');
}

function verify_jwt($token) {
    global $secret_key;
    try {
        return JWT::decode($token, new Key($secret_key, 'HS256'));
    } catch (Exception $e) {
        return false;
    }
}
?>