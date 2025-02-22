<?php 
header('Content-Type: application/json');
require '../Model/db.php';
require 'jwt_helper.php';
//$email=token_validate();
//if($email) {
    $action = $_GET['action'] ?? '';

    if ($action == 'dashboard') {
        // Get user_id from request
        $user_id = $_GET['user_id'] ?? null;

        if (empty($user_id)) {
            die(json_encode(["status" => false, "message" => "User ID is required"]));
        }

        // Fetch total quizzes attended
        $stmt = $pdo->prepare("SELECT COUNT(*) AS total_attended FROM results WHERE user_id = ?");
        $stmt->execute([$user_id]);
        $total_attended = $stmt->fetch(PDO::FETCH_ASSOC)['total_attended'];

        // Fetch pass, fail, incomplete counts
        $stmt = $pdo->prepare("
            SELECT 
                SUM(CASE WHEN result_status = 'Pass' THEN 1 ELSE 0 END) AS passed,
                SUM(CASE WHEN result_status = 'Fail' THEN 1 ELSE 0 END) AS failed,
                SUM(CASE WHEN result_status = 'Incomplete' THEN 1 ELSE 0 END) AS incomplete
            FROM results
            WHERE user_id = ?
        ");
        $stmt->execute([$user_id]);
        $status_counts = $stmt->fetch(PDO::FETCH_ASSOC);

        // Fetch exam history (last 10 quizzes)
        $stmt = $pdo->prepare("
            SELECT c.category_name, s.sub_category_name, r.time_duration, r.result_status, r.total_marks
            FROM results r
            INNER JOIN category c ON r.category_id = c.id
            INNER JOIN subcategory s ON r.subcategory_id = s.id
            WHERE r.user_id = ?
            ORDER BY r.created_at DESC
            LIMIT 10
        ");
        $stmt->execute([$user_id]);
        $exam_history = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Fetch top-scored category (highest total marks)
        $stmt = $pdo->prepare("
            SELECT DISTINCT c.category_name, s.sub_category_name
            FROM results r
            INNER JOIN category c ON r.category_id = c.id
            INNER JOIN subcategory s ON r.subcategory_id = s.id
            WHERE r.user_id = ?
            ORDER BY r.total_marks DESC, r.created_at DESC   
        ");
        $stmt->execute([$user_id]);
        $top_scored_category = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Prepare JSON Response
        $response = [
            "status" => true,
            "result" => [
                "user_id" => (int) $user_id,
                "no_quiz_attendent" => (int) $total_attended,
                "no_of_pass" => (int) $status_counts["passed"],
                "no_of_fail" => (int) $status_counts["failed"],
                "no_of_incomplete" => (int) $status_counts["incomplete"],
                "exam_history" => $exam_history,
                "top_scored_category" => $top_scored_category
            ]
        ];

        // Return JSON Response
        echo json_encode($response, JSON_PRETTY_PRINT);
    }
//}
?>