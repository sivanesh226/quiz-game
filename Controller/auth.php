<?php
require '../Model/db.php';
require 'jwt_helper.php';

$action = $_GET['action'] ?? '';
if ($action == 'login') {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'];
    $password = $data['password'];
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? AND password = SHA2(?,224)" );
    $stmt->execute([$email,$password]);
    $user = $stmt->fetch();

    if ($user) {
        // password_verify($password, $user['password'])
        $token = generate_jwt(['email' => $email, ]);
        echo json_encode(['status'=> true, 'result'=> ['token' => $token, 'user_id' => $user['id'], 'name' => $user['name'], 'email' => $user['email'], 'role'=>$user['role']] ]);
    } else {
        echo json_encode(['error' => 'Invalid credentials']);
    }
} elseif ($action == 'auto_login') {
    $email=token_validate();
    
    if($email) {
        echo "we".$email;
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?" );
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        echo $user;
        if ($user) {
            echo json_encode(['status'=> true, 'result'=> ['token' => $token, 'user_id' => $user['id'], 'name' => $user['name'], 'email' => $user['email'], 'role'=>$user['role']] ]);
        } else {
            echo json_encode(['error' => 'Invalid Token']);
        }
    }
}
?>