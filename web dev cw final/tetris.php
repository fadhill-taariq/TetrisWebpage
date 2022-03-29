<?php
session_start(); 

if (isset($_SESSION['tetrisbut'])) {
    $_SESSION['msg'] = "You must log in first";
    header('location: indexsite.php');
}
if (isset($_GET['but_logout'])) {
    session_destroy();
    unset($_SESSION['username']);
    header("location: indexsite.php");
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
            <button name = "but_logout" onclick="document.location='indexsite.php'">Logout</button>
            <button name = "play_again" onclick="document.location='tetris.php'">Play Again!</button>
        </form>
        <canvas id='my-canvas'></canvas>
    </body>
</html>


