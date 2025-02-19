<?php
require '../Model/db.php';
require 'jwt_helper.php';

$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'];
$email = $data['email'];
$password = $data['password'];
$cpassword = $data['cpassword'];

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user) {
    $stmt = $pdo->prepare("INSERT INTO users (name,email, password) VALUES (?, ?,'')");
    $stmt->execute([$name,$email]);

    $token = generate_jwt(['email' => $email]);
    echo json_encode(['status'=> true, 'result'=> [  'token' => $token, 'name' => $user['name'], 'email' => $user['email'], 'role'=>'user'] ]);
} else {
    echo json_encode(['status'=> false,'errorMsg' => 'Email Already Exist']);

}
?>