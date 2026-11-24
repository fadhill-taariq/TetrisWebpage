<?php
session_start();

if (isset($_POST['but_logout'])) {
    session_destroy();
    header("location: indexsite.php");
    exit;
}
if (!isset($_SESSION['uname'])) {
    header('location: indexsite.php');
    exit;
}
?>

<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="Web_Dev.css">
        <script src="tetris.js"></script>
    </head>
    <body class="main">
        <?php
            include "navbar.php";
        ?>
        <form method ="post" action="tetris.php">
            <button type="submit" name="but_logout">Logout</button>
            <button type="button" name="play_again" onclick="document.location='tetris.php'">Play Again!</button>
        </form>
        <canvas id='my-canvas'></canvas>
    </body>
</html>


