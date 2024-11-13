<?php
require_once 'config/database.php'; // Database connection
require_once 'controllers/UserController.php'; // Import the user controller
require_once 'routes/web.php'; // Include public routes

// Create an instance of the app and handle the request
$request = $_SERVER['REQUEST_URI'];
switch ($request) {
    case '/login':
        (new UserController)->login();
        break;
    case '/register':
        (new UserController)->register();
        break;
    default:
        echo "Page not found";
        break;
}
