-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-02-2026 a las 20:54:57
-- Versión del servidor: 8.0.43
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hogar`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `estado` enum('ACTIVO','INACTIVO') NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre`, `imagen`, `estado`) VALUES
(1, 'Hogar', NULL, 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `sku` varchar(50) NOT NULL,
  `color` varchar(50) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `id_subsubcategoria` int DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `nombre`, `marca`, `sku`, `color`, `descripcion`, `imagen`, `precio`, `stock`, `id_subsubcategoria`, `id_usuario`, `estado`) VALUES
(1, 'Sofá 3 puestos', '', '', '', 'Sofá moderno color gris', NULL, 2050000.00, 5, 1, NULL, 'activo'),
(2, 'Juego de cojines', '', '', '', 'Cojines decorativos x4', NULL, 120000.00, 15, 2, NULL, 'activo'),
(3, 'Set de ollas', '', '', '', 'Ollas en acero inoxidable', NULL, 350000.00, 10, 3, NULL, 'activo'),
(4, 'Organizador de despensa', '', '', '', 'Organizador plástico modular', NULL, 85000.00, 20, 4, NULL, 'activo'),
(5, 'Porta cepillos', '', '', '', 'Accesorio de baño de plástico', NULL, 35000.00, 30, 5, NULL, 'activo'),
(6, 'Juego de toallas', '', '', '', 'Toallas de algodón x3', NULL, 95000.00, 12, 6, NULL, 'activo'),
(7, 'Cuadro decorativo', '', '', '', 'Cuadro abstracto moderno', NULL, 180000.00, 8, 7, NULL, 'activo'),
(8, 'Jarrón de vidrio', '', '', '', 'Jarrón decorativo transparente', NULL, 65000.00, 18, 8, NULL, 'activo'),
(9, 'Limpiador multiusos', '', '', '', 'Producto para limpieza general', NULL, 18000.00, 40, 9, NULL, 'activo'),
(10, 'Canasta de ropa', '', '', '', 'Canasta plástica para lavandería', NULL, 72000.00, 14, 10, NULL, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int NOT NULL,
  `nombre_rol` varchar(50) NOT NULL,
  `estado` enum('ACTIVO','INACTIVO') NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre_rol`, `estado`) VALUES
(1, 'ADMINISTRADOR', 'ACTIVO'),
(2, 'USUARIO', 'ACTIVO'),
(3, 'CLIENTE', 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subcategoria`
--

CREATE TABLE `subcategoria` (
  `id_subcategoria` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `id_categoria` int DEFAULT NULL,
  `estado` enum('ACTIVO','INACTIVO') NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `subcategoria`
--

INSERT INTO `subcategoria` (`id_subcategoria`, `nombre`, `imagen`, `id_categoria`, `estado`) VALUES
(1, 'Sala y comedor', NULL, 1, 'ACTIVO'),
(2, 'Cocina', NULL, 1, 'ACTIVO'),
(3, 'Baño', NULL, 1, 'ACTIVO'),
(4, 'Adornos y decoración', NULL, 1, 'ACTIVO'),
(5, 'Cuidado del Hogar ', NULL, 1, 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subsubcategoria`
--

CREATE TABLE `subsubcategoria` (
  `id_subsubcategoria` int NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `id_subcategoria` int DEFAULT NULL,
  `estado` enum('ACTIVO','INACTIVO') NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `subsubcategoria`
--

INSERT INTO `subsubcategoria` (`id_subsubcategoria`, `nombre`, `imagen`, `id_subcategoria`, `estado`) VALUES
(1, 'Muebles ', NULL, 1, 'ACTIVO'),
(2, 'Textiles ', NULL, 1, 'ACTIVO'),
(3, 'Utensilios de cocina', NULL, 2, 'ACTIVO'),
(4, 'Almacenamiento y organización', NULL, 2, 'ACTIVO'),
(5, 'Accesorios de baño', NULL, 3, 'ACTIVO'),
(6, 'Textiles de baño ', NULL, 3, 'ACTIVO'),
(7, 'Decoración mural', NULL, 4, 'ACTIVO'),
(8, 'Objetos decorativos ', NULL, 4, 'ACTIVO'),
(9, 'Limpieza del hogar', NULL, 5, 'ACTIVO'),
(10, 'Productos y accesorios de lavandería', NULL, 5, 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `estado` enum('ACTIVO','INACTIVO') DEFAULT 'ACTIVO',
  `id_rol` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `usuario`, `nombre`, `apellido`, `correo`, `contrasena`, `avatar`, `estado`, `id_rol`) VALUES
(1, '', 'Administrador', '', 'aidaandreaas@gmail.com', 'administrador123', NULL, 'ACTIVO', 1),
(2, '', 'Usuario', '', 'aida.arredondo@udea.edu.co', 'usuario123', NULL, 'ACTIVO', 2),
(3, '', 'Cliente', '', 'cliente@gmail.com', 'cliente123', NULL, 'ACTIVO', 3),
(9, 'aida123', 'Aida', 'Arredondo', 'aidaandreaasss@gmail.com', '$2y$10$5KDjwNyvVCJVodUGtTb0R.5bnvRZyaneYXPJwItef0Mr3JgL/rptq', 'default', 'ACTIVO', 2),
(11, 'ana123', 'Ana', 'Arredondo', 'ana@mail.com', '$2y$10$9CTEFQ8RkuW4Pyw336sPE.Zx5Sp7j0q13BaHD2RkEGBhzM9AHHGFy', 'default', 'ACTIVO', 2),
(12, 'emanuel123', 'Emanuel', 'Varela', 'varra@mail.com', '$2y$10$jlrR.Oxo7MtAPUTbe2DICelmpxn51EQ2fPERCgHP3NEyzEsVsVt/u', 'default', 'ACTIVO', 2),
(13, 'kiara', 'Kiara', 'Karey', 'kiaramiau@gmail.com', '$2y$10$5PcwZrSohXccJ5O3kt6.vO1SFSfs1xJUETB7FPB7RlSvyE5c1gxLm', 'default', 'ACTIVO', 2),
(15, 'Aida8967', 'Aida', 'Silva', 'aidaandreaasfghj@gmail.com', '$2y$10$JcAcyLj4tpb/gJGw2xGleu4gCU/RYkdbd3YbOO4ng2m6NqZ5IaK3C', 'default', 'ACTIVO', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_subsubcategoria` (`id_subsubcategoria`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `subcategoria`
--
ALTER TABLE `subcategoria`
  ADD PRIMARY KEY (`id_subcategoria`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `subsubcategoria`
--
ALTER TABLE `subsubcategoria`
  ADD PRIMARY KEY (`id_subsubcategoria`),
  ADD KEY `id_subcategoria` (`id_subcategoria`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `subcategoria`
--
ALTER TABLE `subcategoria`
  MODIFY `id_subcategoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `subsubcategoria`
--
ALTER TABLE `subsubcategoria`
  MODIFY `id_subsubcategoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_subsubcategoria`) REFERENCES `subsubcategoria` (`id_subsubcategoria`),
  ADD CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `subcategoria`
--
ALTER TABLE `subcategoria`
  ADD CONSTRAINT `subcategoria_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`);

--
-- Filtros para la tabla `subsubcategoria`
--
ALTER TABLE `subsubcategoria`
  ADD CONSTRAINT `subsubcategoria_ibfk_1` FOREIGN KEY (`id_subcategoria`) REFERENCES `subcategoria` (`id_subcategoria`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;