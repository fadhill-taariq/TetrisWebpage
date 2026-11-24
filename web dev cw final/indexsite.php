<?php 
include "db_conn.php";
session_start();

if(isset($_POST['login']))
{
    $uname = $_POST['uname'] ?? '';
    $pass  = $_POST['pass'] ?? '';

    $stmt = mysqli_prepare($con, "SELECT UserName, Password FROM Users WHERE UserName = ?");
    mysqli_stmt_bind_param($stmt, "s", $uname);
    mysqli_stmt_execute($stmt);
    $row = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));

    if($row && password_verify($pass, $row['Password']))
    {
        session_regenerate_id(true);
        $_SESSION['uname'] = $row['UserName'];

        header("Location: tetris.php");
        exit;
    }
    else
    {
        echo "<h1> Invalid Username/Password. </h1>";
    }
}


// Register user
if(isset($_POST['btnsignup'])){
    $fname = $_POST['fname'] ?? '';
    $lname = $_POST['lname'] ?? '';
    $uname = $_POST['uname'] ?? '';
    $pass  = $_POST['pass'] ?? '';
    $rpass = $_POST['rpass'] ?? '';

    if ($pass === '' || $pass !== $rpass) {
        echo "Error, passwords are empty or do not match.";
    } else {
        $hash = password_hash($pass, PASSWORD_DEFAULT);
        $stmt = mysqli_prepare($con, "INSERT INTO Users (UserName, FirstName, LastName, Password) VALUES (?, ?, ?, ?)");
        mysqli_stmt_bind_param($stmt, "ssss", $uname, $fname, $lname, $hash);
        if (mysqli_stmt_execute($stmt)) {
            echo "Account created successfully.";
        } else {
            echo "Error, failed account creation.";
        }
    }
}


?>

<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="Web Dev.css">
    </head>
    <body class="main">
        <?php include "navbar.php";?>
        <div>
            <h1>Welcome to Tetris</h1>
            <p>Already logged in? Press play to start! If not, <a href="register.php">register today!</a></p>
            <p> 
            <form method="post" action="indexsite.php">
            <label for="uname">User Name:</label><br>
            <input type="text" id="uname" name="uname" placeholder="User Name"><br>
            <label for="pass">Password:</label><br>
            <input type="password" id="pass" name="pass" placeholder="Password"><br></p>
            <p><button type ="submit"  name="login" value = "login"  >Click here to play!</button></p>
            </form>
        </div>
    </body>
</html>