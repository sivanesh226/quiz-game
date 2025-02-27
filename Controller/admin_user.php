<?php
header('Content-Type: application/json');
require '../Model/db.php';
require 'jwt_helper.php';
$decoded_token = token_validate();
if ($decoded_token && isset($decoded_token['email'])) {
    $email = $decoded_token['email'] ?? null;  // Extract email from decoded token
    $action = $_GET['action'] ?? '';

    // Select and search User
    if ($action == 'view_users') {
        $data = json_decode(file_get_contents("php://input"), true);
        $search_key = $_GET['search_key'] ?? $data['search_key'] ?? '';
        $limit = 20;

        if (!empty($search_key)) {
            $stmt = $pdo->prepare("SELECT id, name, email, role, (password IS NOT NULL AND password != '') AS has_password 
                                   FROM users 
                                   WHERE (name LIKE ? OR email LIKE ?) AND isActive = 1 
                                   LIMIT 20");
            $search_term = "%$search_key%";
            $stmt->execute([$search_term, $search_term]);
        } else {
            $stmt = $pdo->prepare("SELECT id, name, email, role, (password IS NOT NULL AND password != '') AS has_password 
                                   FROM users 
                                   WHERE isActive = 1 
                                   LIMIT 20");
            $stmt->execute();
        }

        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($users) {
            // Convert 'has_password' to boolean and rename to 'password'
            // if(isset($user['has_password'])) {
                foreach ($users as &$user) {
                        $user['password'] = (bool) $user['has_password']; // Convert to true/false
                        unset($user['has_password']); // Remove the temporary field
                    }
            //}
            echo json_encode(["status" => true, "result" => $users]);
        } else {
            echo json_encode(["status" => false, "message" => "No users found"]);
        }
    } 
    
    // Add or Update User
    elseif ($action == 'admin_addUpdate_user') {
        $data = json_decode(file_get_contents("php://input"), true);
        $user_id = $data['user_id'];
        $password = $data['password'];
        if(isset($user_id)) {
            $query = "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?";
            $params = [$data['user_name'], $data['email_id'], $data['role'], $data['user_id']];

            if (!empty($data['password'])) {
                $query = "UPDATE users SET name = ?, email = ?, role = ?, `password` = ? WHERE id = ?";

                $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT); // More secure hashing

                $params = [$data['user_name'], $data['email_id'], $data['role'], $hashedPassword, $data['user_id']];
            }

            $stmt = $pdo->prepare($query);
            $stmt->execute($params);

            echo json_encode(["status" => true, "result" => "User updated successfully"]);
        } elseif(!isset($user_id) || empty($user_id) || $user_id == '') {
            // $data = json_decode(file_get_contents("php://input"), true);
            if (!isset($data['user_name'], $data['email_id'], $data['role'], $data['password'])) {
                echo json_encode(["status" => false, "message" => "Missing required fields"]);
            } 
        
            $stmt = $pdo->prepare("INSERT INTO users (name, email, role, `password`) VALUES (?, ?, ?, ?)");

            $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT); // More secure hashing

            $stmt->execute([$data['user_name'], $data['email_id'], $data['role'], $hashedPassword]);
        
            echo json_encode(["status" => true, "result" => "User created successfully"]);
        } else {
            echo json_encode(["status" => false, "message" => "User not inserted or updated"]);
        }
    } 
    
    // Delete user
    elseif ( $action == "admin_user_delete") {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['user_id'])) {
            echo json_encode(["status" => false, "message" => "User ID is required"]);
        }

        $stmt = $pdo->prepare("UPDATE users SET isActive = 0 WHERE id = ?");
        $stmt->execute([$data['user_id']]);

        echo json_encode(["status" => true, "result" => "User deleted successfully"]);
    }
}
?>