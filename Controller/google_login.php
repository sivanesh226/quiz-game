<?php
require '../Model/db.php';
require 'jwt_helper.php';
require __DIR__ . '/../vendor/autoload.php';

use Firebase\JWT\JWT;

$data = json_decode(file_get_contents('php://input'), true);
$accessToken = $data['access_token'];

// $client = new Google_Client(['client_id' => 'YOUR_GOOGLE_CLIENT_ID']);
// $payload = $client->verifyIdToken($credential);

$userInfoUrl = "https://www.googleapis.com/oauth2/v3/userinfo";
$options = [
    "http" => [
        "header" => "Authorization: Bearer " . $accessToken
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($userInfoUrl, false, $context);
$userInfo = json_decode($response, true);

if (isset($userInfo['error'])) {
    die("Error fetching user info: " . $userInfo['error_description']);
    echo json_encode(['error' => 'Invalid Google Token']);
}
else{
    // echo json_encode(['status'=> false,'result' => $userInfo ]);
// }
// if ($payload) {
if(isset($userInfo['email'])){
    $email = $userInfo['email'];
    $name = array_key_exists('name',$userInfo)?  $userInfo['name'] :  $userInfo['sub'];
    
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    $token = generate_jwt(['email' => $email]);
    
    if (!$user) {
        // $role = strpos($email, '@admin.com') !== false ? 'Admin' : 'User';
        $stmt = $pdo->prepare("INSERT INTO users (name,email) VALUES (?, ?)");
        $stmt->execute([$name,$email]);
        echo json_encode(['status'=> true, 'result'=> [ 'token' => $token, 'name' => $user['name'], 'email' => $user['email'], 'role'=>'user'] ]);

    } else {
        echo json_encode(['status'=> true, 'result'=> [  'token' => $token, 'name' => $user['name'], 'email' => $user['email'], 'role'=>$user['role']] ]);

    }
}
else{
    echo json_encode(['status'=> false, 'result'=> $userInfo ]);
}

}
?>