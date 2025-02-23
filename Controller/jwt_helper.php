<?php
require __DIR__ . '/../vendor/autoload.php';
require '../Model/db.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secret_key = "your_secret_key";

function generate_jwt($payload) {
    global $secret_key;
    return JWT::encode($payload, $secret_key, 'HS256');
}

function token_validate() {
    global $secret_key;
    $token = getBearerToken();
    if (!$token) {
        echo json_encode(["error" => "Token not provided"]);
        return false;
    }
    
    try {
        $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
        return (array) $decoded;
       // echo json_encode(["message" => "Token is valid", "user" => $decoded]);
    } catch (Exception $e) {
        echo json_encode(["error" => "Invalid token: " . $e->getMessage()]);
        return false;
    }
}

function getBearerToken() {
    $headers = getallheaders();
    if (isset($headers['Authorization'])) {
        $matches = [];
        if (preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
            return $matches[1];
        }
    }
    return null;
}

function getUserFronToken($email) {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    return $user;
}


?>