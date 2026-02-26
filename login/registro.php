<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $usuario       = trim($_POST['usuario'] ?? '');
    $nombre        = trim($_POST['nombre'] ?? '');
    $apellido      = trim($_POST['apellido'] ?? '');
    $correo        = trim($_POST['correo'] ?? '');
    $passwordPlano = $_POST['password'] ?? '';

    if (!$usuario || !$nombre || !$apellido || !$correo || !$passwordPlano) {
        header("Location: http://localhost/PracticaHogar/login/indexlogin.html?error=general");
        exit();
    }

    if (!isset($_POST['terminos'])) {
        header("Location: http://localhost/PracticaHogar/login/indexlogin.html?error=general");
        exit();
    }

    $passwordSeguro = password_hash($passwordPlano, PASSWORD_DEFAULT);
    $avatar         = "default";
    $estado         = "activo";
    $id_rol         = 2;

    $sql = "INSERT INTO usuario (usuario, nombre, apellido, correo, contrasena, avatar, estado, id_rol)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        header("Location: http://localhost/PracticaHogar/login/indexlogin.html?error=general");
        exit();
    }

    $stmt->bind_param("sssssssi", $usuario, $nombre, $apellido, $correo, $passwordSeguro, $avatar, $estado, $id_rol);

    if ($stmt->execute()) {
        header("Location: http://localhost/PracticaHogar/login/indexlogin.html?exito=registrado");
        exit();
    } else {
        if ($conn->errno == 1062) {
            header("Location: http://localhost/PracticaHogar/login/indexlogin.html?error=duplicado");
            exit();
        } else {
            header("Location: http://localhost/PracticaHogar/login/indexlogin.html?error=general");
            exit();
        }
    }

    $stmt->close();
    $conn->close();

} 
?>
