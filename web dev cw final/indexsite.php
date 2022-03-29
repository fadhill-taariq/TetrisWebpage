<?php 
include "db_conn.php";
session_start();

if(isset($_POST['login']))
{
    extract($_POST);
    $sql=mysqli_query($con,"SELECT * FROM Users WHERE UserName='$uname' AND Password='$pass'");
    $row=mysqli_fetch_array($sql);
    if(is_array($row))
    {
        $_SESSION['uname'] = $row['uname'];
        $_SESSION['pass']=$row['pass'];
        
        header("Location: tetris.php"); 
    }
    else
    {
        echo "<h1> Invalid Username/Password. </h1>";
    }
}


// Register user
if(isset($_POST['btnsignup'])){
    $fname = mysqli_real_escape_string($con, $_POST['fname']);
    $lname = mysqli_real_escape_string($con, $_POST['lname']);
    $uname = mysqli_real_escape_string($con, $_POST['uname']);
    $pass = mysqli_real_escape_string($con, $_POST['pass']);
    $rpass = mysqli_real_escape_string($con, $_POST['rpass']);
    
    // Insert records
    $insertSQL = "INSERT INTO users (UserName, FirstName, LastName, Password) VALUES('$uname', '$fname', '$lname', '$pass')";
    if (mysqli_query($con, $insertSQL) === 1){
    echo "Account created successfully.";
    } else {
        echo "Error, failed account creation.";
        
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
            <input type="text" id="pass" name="pass" placeholder="Password"><br></p>
            <p><button type ="submit"  name="login" value = "login"  >Click here to play!</button></p>
            </form>
        </div>
    </body>
</html>