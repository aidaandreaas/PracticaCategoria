<?php
session_start();
include("conexion.php");

ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $correo     = $_POST['correo'];
    $contrasena = $_POST['contrasena'];

    $sql = "SELECT * FROM usuario WHERE correo = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {

        $usuario = $resultado->fetch_assoc();

        if (password_verify($contrasena, $usuario['contrasena'])) {

            $_SESSION['id_usuario'] = $usuario['id_usuario'];
            $_SESSION['nombre']     = $usuario['nombre'];
            $_SESSION['rol']        = $usuario['id_rol'];

            header("Location: http://localhost/PracticaHogar/dashboard/dashboard.html");
            exit();

        } else {
            header("Location: http://localhost/PracticaHogar/login/indexlogin.html?error=contrasena");
            exit();
        }

    } else {
        header("Location: http://localhost/PracticaHogar/login/indexlogin.html?error=usuario");
        exit();
    }

}
?>