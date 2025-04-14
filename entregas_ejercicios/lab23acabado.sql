/*
1. Store Procedure para obtener lo que se debe de pagar por proyecto segun la clave':
*/
DELIMITER $$

CREATE PROCEDURE ObtenerTotalAPagarPorProyecto(IN proyecto_numero INT)
BEGIN
    SELECT 
        p.numero,
        p.denominacion AS 'Nombre del Proyecto',
        SUM(e.cantidad * m.precio) AS 'Total a Pagar'
    FROM 
        proyectos p
        JOIN entregan e ON p.numero = e.numero
        JOIN materiales m ON e.clave = m.clave
    WHERE
        p.numero = proyecto_numero
    GROUP BY 
        p.numero, p.denominacion;
END $$

DELIMITER ;


/*
2.- store procedure para obtener la lista de materiales entregados por un proveedor especifico
*/
DELIMITER $$

CREATE PROCEDURE ObtenerMaterialesPorProveedor(IN proveedor_id text)
BEGIN
    SELECT 
        pr.razonsocial AS Nombre_Proveedor,
        m.clave AS Clave_Material,
        m.descripcion AS Descripcion,
        e.cantidad,
        e.fecha
    FROM 
        proveedores pr
        JOIN entregan e ON pr.rfc = e.rfc
        JOIN materiales m ON e.clave = m.clave
    WHERE 
        pr.rfc = proveedor_id;
END $$

DELIMITER ;

/*
3.- En que proyectos un proveedor ha entregado materiales
*/

DELIMITER $$

CREATE PROCEDURE ProyectosDeProveedor(IN proveedor_id text)
BEGIN
    SELECT DISTINCT
        p.numero AS Numero_Proyecto,
        p.denominacion AS Nombre_Proyecto
    FROM 
        proyectos p
        JOIN entregan e ON p.numero = e.numero
    WHERE 
        e.rfc = proveedor_id;
END $$

DELIMITER ;

CALL ObtenerTotalAPagarPorProyecto(5008);
CALL ObtenerMaterialesPorProveedor('BBBB800101');
CALL ProyectosDeProveedor('BBBB800101');