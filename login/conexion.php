<?php
$servername = "localhost";
$username = "root";
$password = "";
$db = "hogar";

$conn = new mysqli($servername, $username, $password, $db);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>