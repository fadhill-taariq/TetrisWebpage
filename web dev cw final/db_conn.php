<?php
$servername = "localhost";
$uname = "root"; /* User */
$pass = "root"; /* Password */
$dbname = "tetris"; /* Database name */

$con = mysqli_connect('localhost', 'root', 'root', 'tetris');
// Check connection
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}




?>

