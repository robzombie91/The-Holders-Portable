<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "readdata", "krtsTL&AKr4cST", "theholders");
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

if (isset($_GET['search']) && !empty($_GET['search'])) {
    $searchTerm = '%' . strtolower($conn->real_escape_string($_GET['search'])) . '%';
    $stmt = $conn->prepare("SELECT id, title FROM content_data WHERE LOWER(title) LIKE ? LIMIT 10");
    $stmt->bind_param("s", $searchTerm);
    $stmt->execute();
    $result = $stmt->get_result();
    $results = [];
    while ($row = $result->fetch_assoc()) {
        $results[] = ["id" => $row['id'], "title" => $row['title']];
    }
    echo json_encode($results);
    $stmt->close();
    exit();
}

if (isset($_GET['id']) && !empty($_GET['id'])) {
    $contentId = $conn->real_escape_string($_GET['id']);
    $sql = ($contentId == "random") ? "SELECT content, title FROM content_data ORDER BY RAND() LIMIT 1" : "SELECT content, title FROM content_data WHERE id = ?";
    $stmt = $conn->prepare($sql);
    if ($contentId != "random") $stmt->bind_param("s", $contentId);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode(["content" => $row['content'], "title" => $row['title']]);
    } else {
        http_response_code(404);
        echo json_encode(["content" => "Content not found for ID: " . $contentId, "title" => "Not Found"]);
    }
    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["content" => "ID parameter not provided or is empty.", "title" => "Bad Request"]);
}
?>
