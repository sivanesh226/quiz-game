<?php
header('Content-Type: application/json');
require '../Model/db.php';
require 'jwt_helper.php';
//$email=token_validate();
//if($email) {
    $action = $_GET['action'] ?? '';
    if ($action == 'store_result') { 
        // Read JSON Data from Request
        $data = json_decode(file_get_contents("php://input"), true);
        // Validate Required Fields
        $required_fields = ['user_id', 'category_id', 'subcategory_id', 'no_attempt_questions', 'no_right_answer', 'no_wrong_answer', 'total_marks', 'result_status', 'time_duration'];

        $zero_allowed_fields = ['no_attempt_questions', 'no_right_answer', 'no_wrong_answer', 'total_marks'];

        foreach ($required_fields as $field) {
            if (!isset($data[$field]) || ($data[$field] === '' && !in_array($field, $zero_allowed_fields))) {
                die(json_encode(["status" => false, "message" => "Missing or empty field: $field"]));
            }
        }
        // Assign Variables from JSON
        $user_id = $data['user_id'];
        $category_id = $data['category_id'];
        $subcategory_id = $data['subcategory_id'];
        $no_attempt_quest = $data['no_attempt_questions'];
        $no_right_answer = $data['no_right_answer'];
        $no_wrong_answer = $data['no_wrong_answer'];
        $total_marks = $data['total_marks'];
        $result_status = $data['result_status'];
        $time_duration = $data['time_duration'];

        // Insert Query
        try {
            $stmt = $pdo->prepare("
                INSERT INTO results (user_id, category_id, subcategory_id, no_attempt_quest, no_right_answer, no_wrong_answer, total_marks, result_status, time_duration)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");

            $stmt->execute([
                $user_id, $category_id, $subcategory_id, $no_attempt_quest, 
                $no_right_answer, $no_wrong_answer, $total_marks, $result_status, $time_duration
            ]);

            echo json_encode(["status" => true, "message" => "Result stored successfully"]);
        
        } catch (PDOException $e) {
            echo json_encode(["status" => false, "message" => "Database error: " . $e->getMessage()]);
        }
    }

//}
?>