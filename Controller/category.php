<?php
header('Content-Type: application/json');
require '../Model/db.php';
require 'jwt_helper.php';
//$email=token_validate();
//if($email) {
    
$action = $_GET['action'] ?? '';

// **VIEW CATEGORY & SUBCATEGORY LIST**
if ($action == 'view') {
    $stmt = $pdo->prepare("SELECT c.id AS category_id, c.category_name, c.created_author, c.updated_author, 
                   s.id AS subcategory_id, s.sub_category_name, s.created_author AS sub_created_author, 
                   s.updated_author AS sub_updated_author
            FROM category c
            LEFT JOIN subcategory s ON c.id = s.category_id
            WHERE c.delFlag = 1 AND (s.delFlag = 1 OR s.delFlag IS NULL)");
    
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC); // Fetch all data

    $categories = [];

    foreach ($rows as $row) {
        $category_id = $row['category_id'];

        // If category is not added yet, add it
        if (!isset($categories[$category_id])) {
            $categories[$category_id] = [
                "id" => $category_id,
                "category_name" => $row['category_name'],
                "created_author" => $row['created_author'],
                "updated_author" => $row['updated_author'],
                "subcategories" => []
            ];
        }

        // If subcategory exists, add it under the respective category
        if (!empty($row['subcategory_id'])) {
            $categories[$category_id]['subcategories'][] = [
                "id" => $row['subcategory_id'],
                "sub_category_name" => $row['sub_category_name'],
                "created_author" => $row['sub_created_author'],
                "updated_author" => $row['sub_updated_author']
            ];
        }
    }

    echo json_encode(["categories" => array_values($categories)], JSON_PRETTY_PRINT);
}

elseif ($action == 'insert_category') {
    // Insert new category
    $data = json_decode(file_get_contents("php://input"), true);
    $category_name = $data['category_name'] ?? '';
    $author = getUsergetUserFronToken($email);

    if (!empty($category_name)) {
        $stmt = $pdo->prepare("INSERT INTO category (category_name, created_author, updated_author) VALUES (?, ?, ?)");
        $stmt->execute([$category_name, $author, $author]);
        echo json_encode(["message" => "Category inserted successfully"]);
    } else {
        echo json_encode(["error" => "Category name is required"]);
    }
}

elseif ($action == 'insert_subcategory') {
    // Insert new subcategory
    $data = json_decode(file_get_contents("php://input"), true);
    $category_id = $data['category_id'] ?? '';
    $sub_category_name = $data['sub_category_name'] ?? '';
    $author = $data['author'] ?? '';

    if (!empty($category_id) && !empty($sub_category_name)) {
        $stmt = $pdo->prepare("INSERT INTO subcategory (category_id, sub_category_name, created_author, updated_author) VALUES (?, ?, ?, ?)");
        $stmt->execute([$category_id, $sub_category_name, $author, $author]);
        echo json_encode(["message" => "Subcategory inserted successfully"]);
    } else {
        echo json_encode(["error" => "Category ID and subcategory name are required"]);
    }
}

elseif ($action == 'update_category') {
    // Update category
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? '';
    $category_name = $data['category_name'] ?? '';
    $updated_author = $data['updated_author'] ?? '';

    if (!empty($id) && !empty($category_name)) {
        $stmt = $pdo->prepare("UPDATE category SET category_name = ?, updated_author = ? WHERE id = ?");
        $stmt->execute([$category_name, $updated_author, $id]);
        echo json_encode(["message" => "Category updated successfully"]);
    } else {
        echo json_encode(["error" => "ID and category name are required"]);
    }
}

elseif ($action == 'update_subcategory') {
    // Update subcategory
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? '';
    $sub_category_name = $data['sub_category_name'] ?? '';
    $updated_author = $data['updated_author'] ?? '';

    if (!empty($id) && !empty($sub_category_name)) {
        $stmt = $pdo->prepare("UPDATE subcategory SET sub_category_name = ?, updated_author = ? WHERE id = ?");
        $stmt->execute([$sub_category_name, $updated_author, $id]);
        echo json_encode(["message" => "Subcategory updated successfully"]);
    } else {
        echo json_encode(["error" => "ID and subcategory name are required"]);
    }
}

elseif ($action == 'delete_category') {
    // Soft delete category
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? '';

    if (!empty($id)) {
        $stmt = $pdo->prepare("UPDATE category SET delFlag = 1 WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["message" => "Category deleted successfully"]);
    } else {
        echo json_encode(["error" => "ID is required"]);
    }
}

elseif ($action == 'delete_subcategory') {
    // Soft delete subcategory
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? '';

    if (!empty($id)) {
        $stmt = $pdo->prepare("UPDATE subcategory SET delFlag = 1 WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(["message" => "Subcategory deleted successfully"]);
    } else {
        echo json_encode(["error" => "ID is required"]);
    }
}

else {
    echo json_encode(["error" => "Invalid action"]);
}

?>