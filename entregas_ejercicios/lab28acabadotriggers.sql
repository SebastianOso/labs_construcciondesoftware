use rcortese;

-- insert para tener una bitacora para ver cada ver que hacen un insert en la tabla materiales
CREATE TABLE bitacora_materiales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    usuario VARCHAR(50) NOT NULL,
    accion VARCHAR(50) NOT NULL
);

-- Modificar el trigger para usar solo las columnas que existen
DELIMITER $$

CREATE TRIGGER tr_bitacora_materiales
AFTER INSERT ON materiales
FOR EACH ROW
BEGIN
    INSERT INTO bitacora_materiales (fecha, usuario, accion)
    VALUES (CURRENT_TIMESTAMP, USER(), 'INSERT');
END $$

DELIMITER ;

-- Insertar un nuevo material
INSERT INTO materiales (clave, descripcion, precio, impuesto, PorcentajeImpuesto)
VALUES (777, 'Nueva Varilla', 150.00, 15.00, 2.50);



-- trigger para actualizaciones de precio en la tabla de materiales
DELIMITER //

CREATE TRIGGER tr_historial_precios_nuevo
AFTER UPDATE ON materiales
FOR EACH ROW
BEGIN
    IF NEW.precio != OLD.precio THEN
        INSERT INTO bitacora_materiales (fecha, usuario, accion)
        VALUES (CURRENT_TIMESTAMP, USER(), 'ACTUALIZACION_PRECIO');
    END IF;
END //

DELIMITER ;

-- Ejemplo de prueba
UPDATE materiales 
SET precio = 200 
WHERE clave = 1000;