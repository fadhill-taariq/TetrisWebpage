<?php
// Credentials come from environment variables so they are not committed.
// Set DB_HOST, DB_USER, DB_PASS and DB_NAME on the server (or in a local, git-ignored config).
$servername = getenv('DB_HOST') ?: 'localhost';
$uname_db   = getenv('DB_USER') ?: 'root';
$pass_db    = getenv('DB_PASS') ?: '';
$dbname     = getenv('DB_NAME') ?: 'tetris';

$con = mysqli_connect($servername, $uname_db, $pass_db, $dbname);
// Check connection
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}
?>
