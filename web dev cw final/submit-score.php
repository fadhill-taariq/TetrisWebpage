<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['uname'])) {
    http_response_code(401);
    echo json_encode(['ok' => false, 'error' => 'not logged in']);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['score']) || !ctype_digit($_POST['score'])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'bad score']);
    exit;
}

include "db_conn.php";
$user  = $_SESSION['uname'];
$score = (int)$_POST['score'];

try {
    $stmt = mysqli_prepare($con, "INSERT INTO Scores (Username, Score) VALUES (?, ?)");
    mysqli_stmt_bind_param($stmt, "si", $user, $score);
    mysqli_stmt_execute($stmt);
    echo json_encode(['ok' => true]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'could not save score']);
}
