<?php
require '../Model/db.php';
require 'jwt_helper.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$password = $data['password'];
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? AND password = SHA2(?,224)" );
$stmt->execute([$email,$password]);
$user = $stmt->fetch();

if ($user) {
    // password_verify($password, $user['password'])
    $token = generate_jwt(['email' => $email, ]);
    echo json_encode(['status'=> true, 'result'=> [  'token' => $token, 'name' => $user['name'], 'email' => $user['email'], 'role'=>$user['role']] ]);;
} else {
    echo json_encode(['error' => 'Invalid credentials']);
}
?>