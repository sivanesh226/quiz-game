<?php
header('Content-Type: application/json');
require '../Model/db.php';
require 'jwt_helper.php';
$decoded_token = token_validate();
if ($decoded_token && isset($decoded_token['email'])) {
    $email = $decoded_token['email'] ?? null;  // Extract email from decoded token
    $action = $_GET['action'] ?? '';

    if ($action == 'view_question') {
        $category_id = $_GET['category_id'] ?? '';
        $subcategory_id = $_GET['subcategory_id'] ?? '';

        if (!empty($category_id) && !empty($subcategory_id)) {
            // Fetch 10 random questions from the selected category and subcategory
            $stmt = $pdo->prepare("
                SELECT q.id, q.category_id, c.category_name, q.subcategory_id, s.sub_category_name, 
                    q.question_text, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_option,
                    q.created_author, q.updated_author
                FROM questions q
                INNER JOIN category c ON q.category_id = c.id
                INNER JOIN subcategory s ON q.subcategory_id = s.id
                WHERE q.category_id = ? AND q.subcategory_id = ? AND q.isActive = 1
                ORDER BY RAND()
                LIMIT 5
            ");
            $stmt->execute([$category_id, $subcategory_id]);
            $questions = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (!empty($questions)) {
                // Format the questions into the required JSON structure
                $formatted_questions = [];
                foreach ($questions as $q) {
                    $formatted_questions[] = [
                        "id" => $q["id"],
                        "question_text" => $q["question_text"],
                        "options" => [
                            ["option_name" => "A", "option_value" => $q["option_a"]],
                            ["option_name" => "B", "option_value" => $q["option_b"]],
                            ["option_name" => "C", "option_value" => $q["option_c"]],
                            ["option_name" => "D", "option_value" => $q["option_d"]]
                        ],
                        "correct_option" => $q["correct_option"],
                        "created_author" => $q["created_author"],
                        "updated_author" => $q["updated_author"]
                    ];
                }

                // Corrected JSON structure
            $response = [               
                        "category_id" => $category_id,
                        "category_name" => $questions[0]["category_name"] ?? "",
                        "sub_category_id" => $subcategory_id,
                        "sub_category_name" => $questions[0]["sub_category_name"] ?? "",
                        "questions" => $formatted_questions
                    ];

                echo json_encode(['status'=> true, 'result'=> $response], JSON_PRETTY_PRINT);
            } else {
                echo json_encode(['status'=> false, 'message'=> "No questions found"]);
            }
        } else {
            echo json_encode(['status'=> false, 'message'=> "category_id and subcategory_id are required"]);
        }
    }

    elseif ($action == 'admin_view_question') {
        $category_id = $_GET['category_id'] ?? '';
        $subcategory_id = $_GET['subcategory_id'] ?? '';

        if (!empty($category_id) && !empty($subcategory_id)) {
            // Fetch 10 random questions from the selected category and subcategory
            $stmt = $pdo->prepare("
                SELECT q.id, q.category_id, c.category_name, q.subcategory_id, s.sub_category_name, 
                    q.question_text, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_option,
                    q.created_author, q.updated_author
                FROM questions q
                INNER JOIN category c ON q.category_id = c.id
                INNER JOIN subcategory s ON q.subcategory_id = s.id
                WHERE q.category_id = ? AND q.subcategory_id = ? AND q.isActive = 1
            ");
            $stmt->execute([$category_id, $subcategory_id]);
            $questions = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (!empty($questions)) {
                // Format the questions into the required JSON structure
                $formatted_questions = [];
                foreach ($questions as $q) {
                    $formatted_questions[] = [
                        "id" => $q["id"],
                        "question_text" => $q["question_text"],
                        "options" => [
                            ["option_name" => "A", "option_value" => $q["option_a"]],
                            ["option_name" => "B", "option_value" => $q["option_b"]],
                            ["option_name" => "C", "option_value" => $q["option_c"]],
                            ["option_name" => "D", "option_value" => $q["option_d"]]
                        ],
                        "correct_option" => $q["correct_option"],
                        "created_author" => $q["created_author"],
                        "updated_author" => $q["updated_author"]
                    ];
                }

                // Corrected JSON structure
            $response = [               
                        "category_id" => $category_id,
                        "category_name" => $questions[0]["category_name"] ?? "",
                        "sub_category_id" => $subcategory_id,
                        "sub_category_name" => $questions[0]["sub_category_name"] ?? "",
                        "questions" => $formatted_questions
                    ];

                echo json_encode(['status'=> true, 'result'=> $response], JSON_PRETTY_PRINT);
            } else {
                echo json_encode(['status'=> false, 'message'=> "No questions found"]);
            }
        } else {
            echo json_encode(['status'=> false, 'message'=> "category_id and subcategory_id are required"]);
        }
    }


    elseif ($action == 'insert_question') {
        // Insert new question
        $data = json_decode(file_get_contents("php://input"), true);
        $category_id = $data['category_id'] ?? '';
        $subcategory_id = $data['subcategory_id'] ?? '';
        $question_text = $data['question_text'] ?? '';
        $option_a = $data['option_a'] ?? '';
        $option_b = $data['option_b'] ?? '';
        $option_c = $data['option_c'] ?? '';
        $option_d = $data['option_d'] ?? '';
        $correct_option = $data['correct_option'] ?? '';
        $userInfo = getUserFronToken($email);

        if (!empty($category_id) && !empty($subcategory_id) && !empty($question_text) && 
            !empty($option_a) && !empty($option_b) && !empty($option_c) && !empty($option_d) && 
            in_array($correct_option, ['A', 'B', 'C', 'D'])) {

            $stmt = $pdo->prepare("
                INSERT INTO questions (category_id, subcategory_id, question_text, 
                                       option_a, option_b, option_c, option_d, correct_option, 
                                       created_author, updated_author)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([$category_id, $subcategory_id, $question_text, $option_a, $option_b, $option_c, $option_d, $correct_option, $userInfo['name'], '']);

            // Get the last inserted question ID
            $question_id = $pdo->lastInsertId();

            if ($question_id) {
                // Fetch the inserted question details
                $stmt = $pdo->prepare("SELECT * FROM questions WHERE id = ?");
                $stmt->execute([$question_id]);
                $question = $stmt->fetch(PDO::FETCH_ASSOC);
            // // Get the last inserted question ID
            // $question_id = $pdo->lastInsertId();

            // // Fetch the inserted question details
            // $stmt = $pdo->prepare("SELECT * FROM questions WHERE id = ?");
            // $stmt->execute([$question_id]);
            // $q = $stmt->fetch(PDO::FETCH_ASSOC);

            // // Prepare the JSON response
            // $response = [
            //     "status" => true,
            //     "result" => [
            //         "id" => $q["id"],
            //         "question_text" => $q["question_text"],
            //         "options" => [
            //             ["option_name" => "A", "option_value" => $q["option_a"]],
            //             ["option_name" => "B", "option_value" => $q["option_b"]],
            //             ["option_name" => "C", "option_value" => $q["option_c"]],
            //             ["option_name" => "D", "option_value" => $q["option_d"]]
            //         ],
            //         "correct_option" => $q["correct_option"],
            //         "created_author" => $q["created_author"],
            //         "updated_author" => $q["updated_author"]
            //     ]
            // ];
                
                echo json_encode(['status'=> true, 'result'=> $response]);
                    
                }
        } else {
            echo json_encode(['status'=> false, 'error'=> "Invalid input data"]);
        }
    }

    elseif ($action == 'update_question') {
        // Update question
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'] ?? '';
        $question_text = $data['question_text'] ?? '';
        $option_a = $data['option_a'] ?? '';
        $option_b = $data['option_b'] ?? '';
        $option_c = $data['option_c'] ?? '';
        $option_d = $data['option_d'] ?? '';
        $correct_option = $data['correct_option'] ?? '';
        $userInfo = getUserFronToken($email);

        if (!empty($id) && !empty($question_text) && !empty($option_a) && !empty($option_b) && 
            !empty($option_c) && !empty($option_d) && in_array($correct_option, ['A', 'B', 'C', 'D'])) {

            $stmt = $pdo->prepare("
                UPDATE questions 
                SET question_text = ?, option_a = ?, option_b = ?, option_c = ?, option_d = ?, correct_option = ?, updated_author = ? 
                WHERE id = ?
            ");
            $stmt->execute([$question_text, $option_a, $option_b, $option_c, $option_d, $correct_option, $userInfo['name'], $id]);

            // Get the last inserted question ID
            // $question_id = $data['id'] ?? '';
            // // Fetch the inserted question details
            // $stmt = $pdo->prepare("SELECT * FROM questions WHERE id = ?");
            // $stmt->execute([$question_id]);
            // $q = $stmt->fetch(PDO::FETCH_ASSOC);

            // // Prepare the JSON response
            // $response = [
            //     "status" => true,
            //     "result" => [
            //         "id" => $q["id"],
            //         "question_text" => $q["question_text"],
            //         "options" => [
            //             ["option_name" => "A", "option_value" => $q["option_a"]],
            //             ["option_name" => "B", "option_value" => $q["option_b"]],
            //             ["option_name" => "C", "option_value" => $q["option_c"]],
            //             ["option_name" => "D", "option_value" => $q["option_d"]]
            //         ],
            //         "correct_option" => $q["correct_option"],
            //         "created_author" => $q["created_author"],
            //         "updated_author" => $q["updated_author"]
            //     ]
            // ];

            if ($id) {
                // Fetch the inserted question details
                $stmt = $pdo->prepare("SELECT * FROM questions WHERE id = ?");
                $stmt->execute([$id]);
                $question = $stmt->fetch(PDO::FETCH_ASSOC);

                
                echo json_encode(['status'=> true, 'result'=> $question]);
            
            }
        } else {
            echo json_encode(['status'=> false, 'message'=> "Invalid input data"]);
        }
    }

    elseif ($action == 'delete_question') {
        // Soft delete question
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'] ?? '';

        if (!empty($id)) {
            $stmt = $pdo->prepare("UPDATE questions SET isActive = 0 WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['status'=> true, 'result'=> "Question deleted successfully"]);
        } else {
            echo json_encode(['status'=> false, 'message'=> "ID is required"]);
        }
    }

    else {
        echo json_encode(['status'=> false, 'message'=> "Invalid action"]);
    }

}
?>