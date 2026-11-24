<?php include "db_conn.php"; ?>
<!DOCTYPE html>
<html>
        <head>
                <link rel="stylesheet" href="Web_Dev.css">
                <title>Leaderboard</title>
        </head>
        <body class="main">
                <?php include "navbar.php"; ?>
                <div>
                        <table class="table">
                                <tr class='tr'>
                                        <th class='leader'>Username:</th>
                                        <th class='leader'>Score:</th>
                                </tr>
                                <?php
                                $result = mysqli_query($con, "SELECT s.Username, s.Score FROM Scores s JOIN Users u ON u.UserName = s.Username WHERE u.Display = 1 ORDER BY s.Score DESC LIMIT 10");
                                while ($row = mysqli_fetch_assoc($result)) {
                                        echo "<tr class='tr'><td>" . htmlspecialchars($row['Username']) . "</td><td>" . (int)$row['Score'] . "</td></tr>";
                                }
                                ?>
                        </table>
                </div>
        </body>
</html>
