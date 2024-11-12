<?php
// index.php

session_start();

// Check if the user is logged in (example check)
if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: login.php");  // Redirect to login page if not logged in
    exit();
}

// Include reusable templates like header, footer, or sidebar
include_once 'templates/header.php';
include_once 'templates/sidebar.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="css/output.css" rel="stylesheet">
    <title>Admin Dashboard</title>
</head>
<body class="bg-gray-100">
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
        
        <?php
            // Display different content based on URL parameters
            if (isset($_GET['page'])) {
                $page = $_GET['page'];
                if ($page == 'dashboard') {
                    include 'dashboard.php';
                } elseif ($page == 'settings') {
                    include 'settings.php';
                } else {
                    echo "<p>Page not found</p>";
                }
            } else {
                include 'dashboard.php'; // Default to dashboard
            }
        ?>
    </div>

<?php include_once 'templates/footer.php'; ?>
</body>
</html>