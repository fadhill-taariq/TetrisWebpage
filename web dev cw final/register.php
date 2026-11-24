<?php
session_start();
include "db_conn.php";

$error_message = "";
$success_message = "";

if (isset($_POST['btnsignup'])) {
    $fname   = trim($_POST['fname'] ?? '');
    $lname   = trim($_POST['lname'] ?? '');
    $uname   = trim($_POST['uname'] ?? '');
    $pass    = $_POST['pass'] ?? '';
    $rpass   = $_POST['rpass'] ?? '';
    $display = $_POST['display'] ?? '';

    if ($fname === '' || $lname === '' || $uname === '' || $pass === '' || $rpass === '' || $display === '') {
        $error_message = "Please fill all fields.";
    } elseif ($pass !== $rpass) {
        $error_message = "Confirm password not matching";
    } else {
        $hash = password_hash($pass, PASSWORD_DEFAULT);
        $displayFlag = ($display === 'Yes') ? 1 : 0;
        try {
            $stmt = mysqli_prepare($con, "INSERT INTO Users (UserName, FirstName, LastName, Password, Display) VALUES (?, ?, ?, ?, ?)");
            mysqli_stmt_bind_param($stmt, "ssssi", $uname, $fname, $lname, $hash, $displayFlag);
            mysqli_stmt_execute($stmt);
            $success_message = "Account created. You can now log in from the home page.";
        } catch (Throwable $e) {
            $error_message = "Could not create the account. That username may already be taken.";
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="Web_Dev.css">
    

</head>
<body class="main">
<?php
        include "navbar.php";
    
        ?>
    <div>
        <h1>Register to play now!</h1>

        <form action="register.php" method="post">
            
        <?php 
            // Display Error message
            if(!empty($error_message)){
            ?>
            <div class="error message">
              <strong>Error!</strong> <?= $error_message ?>
            </div>

            <?php
            }
            ?>

            <?php 
            // Display Success message
            if(!empty($success_message)){
            ?>
            <div class="success message">
              <strong>Success!</strong> <?= $success_message ?>
            </div>

            <?php
            }
            ?> 
        
            <label for="fname">First Name:</label><br>
            <input type="text" id="fname" name="fname" value=""><br>
            <label for="lname">Last Name:</label><br>
            <input type="text" id="lname" name="lname" value=""><br>
            <label for="uname">Username:</label><br>
            <input type="text" id="uname" name="uname" value=""><br>
            <label for="pass">Password:</label><br>
            <input type="password" id="pass" name="pass" placeholder="Password"><br>
            <label for="rpass">Confirm Password:</label><br>
            <input type="password" id="rpass" name="rpass" placeholder="Confirm Password"><br><br>
            <p>Display scores on leaderboard?</p>
            <input type="radio" id="yes" name="display" value="Yes">
            <label for="display">Yes</label><br>
            <input type="radio" id="no" name="display" value="No">
            <label for="display">No</label><br><br>
            <button type="submit" id = "display" name="btnsignup" class="btn btn-default">Submit</button>

        </form>
    <p> Please fill in the above information to register for the game.</p>

    </div>
</body>
</html>