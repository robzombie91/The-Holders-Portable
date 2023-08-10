<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "readdata";
$password = "krtsTL&AKr4cST";
$dbname = "theholders";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['id']) && !empty($_GET['id'])) {
    $contentId = $conn->real_escape_string($_GET['id']);

    // If 'random' is passed as the ID, fetch a random article
    if ($contentId == "random") {
        $sql = "SELECT content, title FROM content_data ORDER BY RAND() LIMIT 1";
    } else {
        $sql = "SELECT content, title FROM content_data WHERE id = ?";
    }

    $stmt = $conn->prepare($sql);
    
    // If not fetching a random article, bind the parameter
    if ($contentId != "random") {
        $stmt->bind_param("s", $contentId);
    }

    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            // Return content and title in a JSON format
            $response = [
                "content" => $row['content'],
                "title" => $row['title']
            ];
            echo json_encode($response);
        } else {
            http_response_code(404);
            echo json_encode([
                "content" => "Content not found for ID: " . $contentId,
                "title" => "Not Found"
            ]);
        }
    } else {
        http_response_code(500);
        echo json_encode([
            "content" => "Database query failed.",
            "title" => "Error"
        ]);
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode([
        "content" => "ID parameter not provided or is empty.",
        "title" => "Bad Request"
    ]);
}
?>
