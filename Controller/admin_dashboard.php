<?php
header('Content-Type: application/json');
require '../Model/db.php';
require 'jwt_helper.php';
$decoded_token = token_validate();
if ($decoded_token && isset($decoded_token['email'])) {
    $action = $_GET['action'] ?? '';

    if ($action == 'admin_dashboard') {
        try {
            $isActive_flag = 1;
            // Count total active users who have attended at least one quiz
            $stmt = $pdo->prepare("SELECT COUNT(DISTINCT user_id) AS no_of_user FROM results");
            $stmt->execute();
            $no_of_user = $stmt->fetchColumn();
        
            // Count total categories
            $stmt = $pdo->prepare("SELECT COUNT(*) AS no_of_categories FROM category WHERE isActive = ?");
            $stmt->execute([$isActive_flag]);
            $no_of_categories = $stmt->fetchColumn();
        
            // Count total subcategories
            $stmt = $pdo->prepare("SELECT COUNT(*) AS no_of_subcategories FROM subcategory WHERE isActive = ?");
            $stmt->execute([$isActive_flag]);
            $no_of_subcategories = $stmt->fetchColumn();
        
            // Count total questions
            $stmt = $pdo->prepare("SELECT COUNT(*) AS no_of_questions FROM questions WHERE isActive = ?");
            $stmt->execute([$isActive_flag]);
            $no_of_questions = $stmt->fetchColumn();
        
            // Fetch top 10 highest scores of users
            $stmt = $pdo->prepare("
                        SELECT u.name AS user_name, 
                        c.category_name, 
                        s.sub_category_name, 
                        r.time_duration, 
                        r.total_marks
                    FROM results r
                    INNER JOIN users u ON r.user_id = u.id
                    INNER JOIN category c ON r.category_id = c.id
                    INNER JOIN subcategory s ON r.subcategory_id = s.id
                    WHERE r.total_marks > 0  -- Exclude zero marks
                    ORDER BY r.total_marks DESC, r.created_at DESC
                    LIMIT 10;
            ");
            $stmt->execute();
            $high_score_users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
            // Prepare JSON response
            $response = [
                "status" => true,
                "result" => [
                    "no_of_user" => $no_of_user,
                    "no_of_categories" => $no_of_categories,
                    "no_of_subcategories" => $no_of_subcategories,
                    "no_of_questions" => $no_of_questions,
                    "high_score_user" => $high_score_users
                ]
            ];
        
            echo json_encode($response, JSON_PRETTY_PRINT);
        
        } catch (Exception $e) {
            echo json_encode(["status" => false, "message" => "Error: " . $e->getMessage()]);
        }
    }
}
?>