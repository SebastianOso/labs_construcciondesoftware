DELIMITER $$

CREATE PROCEDURE AgregarProveedorConEntregas(
    IN p_rfc VARCHAR(15),
    IN p_razon_social VARCHAR(40),
    IN p_clave_material1 INT,
    IN p_clave_material2 INT,
    IN p_numero_proyecto INT,
    IN p_cantidad1 INT,
    IN p_cantidad2 INT
)
BEGIN
    -- Iniciamos la transacción
    START TRANSACTION;
        -- Insertamos el nuevo proveedor
        INSERT INTO proveedores(rfc, razonsocial) 
        VALUES(p_rfc, p_razon_social);
        
        -- Insertamos las dos primeras entregas
        INSERT INTO entregan(clave, rfc, numero, fecha, cantidad)
        VALUES(p_clave_material1, p_rfc, p_numero_proyecto, CURDATE(), p_cantidad1);
        
        INSERT INTO entregan(clave, rfc, numero, fecha, cantidad)
        VALUES(p_clave_material2, p_rfc, p_numero_proyecto, CURDATE(), p_cantidad2);
        
        COMMIT;
        
        SELECT 'Proveedor agregado con sus primeras entregas' AS mensaje;
END $$

DELIMITER ;

CALL AgregarProveedorConEntregas('CUUH619777', 'FerreTEC', 1000, 1010, 5000, 100, 150);