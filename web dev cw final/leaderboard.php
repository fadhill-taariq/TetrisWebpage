<!DOCTYPE html>
<html>
        <head>
                <link rel="stylesheet" href="Web_Dev.css">
                <title>Leaderboard</title>
                <script src="tetris.js"></script>
                <script src="jquery-3.6.0.js"></script>

        </head>
        <body class="main">
                <?php
                        include "navbar.php";
                        include "tetris.jus";

                ?>
                <div>
                        <form method="post" action="leaderboard.php">
                        <table class="table"> 
                                <tr class='tr'> 
                                        <th class='leader'><label for='name'>Username:</label><br></th>
                                        <th class='leader'><label for='score' >Score:</label><br></th>
                                </tr>
                                <?php
                                function scoreDb(){
                                        if(isset($_REQUEST)){
                                                $score = $_REQUEST['scoreToSend'];

                                                echo 'success';
                                        }
                                        die();
                                }
                                function add_action(){
                                        'wp_ajax_scoresDatab'; 'scoreDb';
                                }
                                        ;
                                include "db_conn.php"; 
                                if(isset($_POST['scoreToSend'])){
                                        $score = $_POST['scoreToSend'];
                                }  
                                $result = mysqli_query($con, "SELECT * FROM scores ORDER BY Score DESC");
                                $ranking = 1;
                                if (mysqli_num_rows($result)) {
                                        while($row = mysqli_fetch_array($result)){
                                        echo
                                        "       <tr class='tr'>
                                                <td>{$row['Username']}</td>
                                                <td>{$row['Score']}</td>
                                        </tr>";
                                        $ranking++;
                                        } 
                                }
                                $SQLInsert = "INSERT INTO scores(Scoreid, Username, Score) VALUES('$ranking', '$uname', '$score')";     
                                ?>
                                </tr>
                        </table>
                </div>
        </body>
</html>