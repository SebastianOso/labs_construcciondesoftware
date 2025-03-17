-- Laboratorio 20: Consultas en SQL
use rcortese;
SET SQL_SAFE_UPDATES = 0;
-- Consulta de un tabla completa
SELECT * FROM materiales;

-- Selección
SELECT * FROM materiales
WHERE clave = 1000;

-- Proyección
SELECT clave, rfc, fecha FROM entregan;

-- JOIN Natural
SELECT * FROM materiales, entregan
WHERE materiales.clave = entregan.clave;

-- NOTA: Si algún material no ha sido entregado, no aparecería en el resultado de esta consulta,
-- ya que la reunión natural solo muestra registros que coinciden en ambas tablas.

-- Reunión con criterio específico
SELECT * FROM entregan, proyectos
WHERE entregan.numero <= proyectos.numero;

-- Unión (se ilustra junto con selección)
/*
sentencia de sql server no sirve en mysql
(SELECT * FROM entregan WHERE clave = 1450)
UNION
(SELECT * FROM entregan WHERE clave = 1300);
*/
-- Consulta equivalente sin usar UNION:
SELECT * FROM entregan 
WHERE clave = 1450 OR clave = 1300;

/*
-- Intersección (en SQL Server se implementa con subconsultas)
SELECT DISTINCT e1.clave 
FROM entregan e1
WHERE e1.numero = 5001 
AND e1.clave in (
    SELECT * 
    FROM entregan e2 
    WHERE e2.numero = 5018 
    AND e1.clave = e2.clave
);

-- Diferencia (en SQL Server se implementa con subconsultas)
SELECT * 
FROM entregan e1
WHERE e1.clave NOT IN (
    SELECT * 
    FROM entregan e2 
    WHERE e2.clave = 1000 
    AND e1.clave = e2.clave 
    AND e1.rfc = e2.rfc 
    AND e1.numero = e2.numero 
    AND e1.fecha = e2.fecha 
    AND e1.cantidad = e2.cantidad
);

-- Producto cartesiano
SELECT * FROM entregan, materiales;
*/

-- -----------------------------------------------------------------------------------------------------------------------------------
-- Construcción de consultas a partir de una especificación


-- Descripciones de los materiales entregados en el año 2000
SELECT m.descripcion 
FROM Materiales M, Entregan E
WHERE M.clave = E.clave 
AND E.fecha BETWEEN '01/01/2000' AND '31/12/2000';
-- ¿Por qué aparecen varias veces algunas descripciones de material?
-- porque se han entregado en diferente tiempo el mismo material

-- Uso del calificador distinct
SELECT DISTINCT m.descripcion 
FROM materiales m, entregan e
WHERE m.clave = e.clave 
AND e.fecha BETWEEN '01/01/2000' AND '31/12/2000';
-- ¿Qué resultado obtienes en esta ocasión?
-- Que solo se muestra una descripcion del mateirla por el uso de distinct poruqe con este se eliminan duplicados 


-- Ordenamientos
-- Obtén los números y denominaciones de los proyectos con las fechas y cantidades de sus entregas, ordenadas por número de proyecto, 
-- presentando las fechas de la más reciente a la más antigua.
SELECT p.numero, p.denominacion, e.fecha, e.cantidad
FROM proyectos p, entregan e
WHERE p.numero = e.numero
ORDER BY p.numero, e.fecha DESC;


-- operadores de cadena

-- Operador LIKE
SELECT * FROM materiales WHERE descripcion LIKE 'Si%';
-- El símbolo % funciona como que acepta todo lo demas que sigue del si
-- ¿Qué sucede si la consulta fuera : LIKE 'Si' ?
-- Con LIKE 'Si', solo proyectaria los registros que tengna en la descripcion 'Si'

/*
-- Ejemplos con operadores de cadena
-- Esto creo solo funciona en sql server
-- Concatenación
SELECT (Apellido + ', ' + Nombre) as Nombre FROM Personas;
DECLARE @foo varchar(40);
DECLARE @bar varchar(40);
SET @foo = '¿Que resultado';
SET @bar = ' ¿¿¿??? ';
SET @foo += ' obtienes?';
PRINT @foo + @bar;
-- Resultado: "¿Que resultado obtienes? ¿¿¿??? "
-- ¿Para qué sirve DECLARE?
-- para declarar variables
-- ¿Cuál es la función de @foo?
-- es el nombre de una variable
-- ¿Que realiza el operador SET?
-- SET asigna el valor a una variable especificada
*/
-- -------------------------------------------------------------------------------------------------------------------------------------

/*
Sin embargo, tenemos otros operadores como [ ] , [^] y _.

[ ] - Busca coincidencia dentro de un intervalo o conjunto dado. 
Estos caracteres se pueden utilizar para buscar coincidencias de patrones como sucede con LIKE.

[^] - En contra parte, este operador coincide con cualquier caracter que no se encuentre dentro del intervalo o del conjunto especificado.

_ - El operador _ o guion bajo, se utiliza para coincidir con un caracter de una comparación de cadenas.
*/

SELECT RFC FROM Entregan WHERE RFC LIKE '[A-D]%';
-- Busca RFCs que empiezan con una letra entre A y D

SELECT RFC FROM Entregan WHERE RFC LIKE '[^A]%';
-- Busca RFCs que NO empiezan con A

SELECT Numero FROM Entregan WHERE Numero LIKE '___6';
-- Busca números que tengan cualquier 3 caracteres seguidos de un 6
-- Basicamente es una expresion regular que funciona con el like

-- ------------------------------------------------------------------------------------------------------------------
-- Operadores compuestos
/*
Los operadores compuestos ejecutan una operación y establecen un valor.
+ = (Suma igual)
- = (Restar igual)
* = (Multiplicar igual)
/ = (Dividir igual)
% = (Módulo igual)
*/

-- -------------------------------------------------------------------------------------------------------------------------
-- Operadores Lógicos.
-- Operador BETWEEN
SELECT Clave, RFC, Numero, Fecha, Cantidad
FROM Entregan
WHERE Numero BETWEEN 5000 AND 5010;

-- ¿Cómo filtrarías rangos de fechas?
-- entregas en el año 2000
SELECT * FROM Entregan 
WHERE Fecha BETWEEN '01/01/2000' AND '31/12/2000';

-- Operador EXISTS
SELECT RFC, Cantidad, Fecha, Numero
FROM Entregan
WHERE Numero BETWEEN 5000 AND 5010 AND
EXISTS (
    SELECT RFC
    FROM Proveedores
    WHERE RazonSocial LIKE 'La%' AND Entregan.RFC = Proveedores.RFC
);

-- ¿Qué hace la consulta?
-- Esta consulta proyecta el RFC, CANTIDAD, FECHA Y NUMERO de las entregas en donde la RAZON SOCIAL de los proveedores
-- empiece con La
-- ¿Qué función tiene el paréntesis ( ) después de EXISTS?
-- El parentesis separa un bloque para que se haga una subconsulta

-- Tomando de base la consulta anterior del EXISTS, realiza el query que devuelva el mismo resultado, pero usando el operador IN
SELECT RFC, Cantidad, Fecha, Numero
FROM Entregan
WHERE Numero BETWEEN 5000 AND 5010 AND
RFC IN (
    SELECT RFC
    FROM Proveedores
    WHERE RazonSocial LIKE 'La%'
);

-- Consulta equivalente usando NOT IN
SELECT RFC, Cantidad, Fecha, Numero
FROM Entregan
WHERE Numero BETWEEN 5000 AND 5010 
AND RFC NOT IN (
    SELECT RFC
    FROM Proveedores
    WHERE RazonSocial NOT LIKE 'La%'
);

-- Ejemplo con operador ALL
SELECT Clave, RFC, Numero, Fecha, Cantidad
FROM Entregan
WHERE Cantidad > ALL (
    SELECT Cantidad
    FROM Entregan
    WHERE Numero = 5001
);
-- Devuelve entregas con cantidad mayor a TODAS las cantidades entregadas al proyecto 5001


/*
El Operador TOP, es un operador que recorre la entrada, un query, y sólo devuelve el primer número o 
porcentaje especifico de filas basado en un criterio de ordenación si es posible.
**solo disponible en sql server
** en mysql es con LIMIT

¿Qué hace la siguiente sentencia? Explica por qué.
SELECT TOP 2 * FROM Proyectos
muestra los primeros 2 registros de la proyeccion

¿Qué sucede con la siguiente consulta? Explica por qué.
SELECT TOP Numero FROM Proyectos
va a dar error ya que le falta el numero o porcentaje para especificar cuantos registros se quieren mostrar en la proyeccion

*/

-- --------------------------------------------------------------------------------------------------------------------------------
-- MODIFICANDO LA ESTRUCTURA DE UNA TABLA
-- Agregar columna PorcentajeImpuesto
ALTER TABLE materiales ADD PorcentajeImpuesto NUMERIC(6,2);

-- Asignar valores de impuesto
UPDATE materiales SET PorcentajeImpuesto = 2*clave/1000;

-- ¿Qué consulta usarías para obtener el importe de las entregas es decir, el total en dinero de lo entregado, 
-- basado en la cantidad de la entrega y el precio del material y el impuesto asignado?
SELECT e.clave, m.descripcion, e.cantidad, m.precio, m.PorcentajeImpuesto,
       e.cantidad * m.precio * (1 + m.PorcentajeImpuesto/100) AS ImporteTotal
FROM entregan e, materiales m
WHERE e.clave = m.clave;

-- ---------------------------------------------------------------------------------------------------------------------------------
-- CREACIÓN DE VISTAS

/*
Create view nombrevista (nombrecolumna1 , nombrecolumna2 ,..., nombrecolumna3 )
as select...

Permite definir una vista. Una vista puede pensarse como una consulta etiquetada con un nombre, 
ya que en realidad al referirnos a una vista el DBMS realmente ejecuta la consulta asociada a ella, 
ero por la cerradura del álgebra relacional, una consulta puede ser vista como una nueva relación o tabla, 
por lo que es perfectamente válido emitir la sentencia:

select * from nombrevista

¡Como si nombrevista fuera una tabla!

*/

-- VISTA 1: Materiales entregados en el año 2000
CREATE VIEW Vista_MaterialesEntregados2000 AS
SELECT DISTINCT m.clave, m.descripcion 
FROM materiales m, entregan e
WHERE m.clave = e.clave 
AND e.fecha BETWEEN '01/01/2000' AND '31/12/2000';

SELECT * FROM Vista_MaterialesEntregados2000;


-- VISTA 2: Proyectos con fechas y cantidades de entregas
CREATE VIEW Vista_ProyectosEntregas AS
SELECT p.numero, p.denominacion, e.fecha, e.cantidad
FROM proyectos p, entregan e
WHERE p.numero = e.numero;

-- Ahora consultamos la vista y ordenamos el resultado
SELECT * FROM Vista_ProyectosEntregas
ORDER BY numero, fecha DESC;

-- VISTA 3: Proveedores que suministran materiales a Televisa en acción
CREATE VIEW Vista_ProveedoresTelevisa AS
SELECT DISTINCT pr.rfc, pr.RazonSocial
FROM proveedores pr, entregan e, proyectos p
WHERE pr.rfc = e.rfc
AND e.numero = p.numero
AND p.denominacion = 'Televisa en acción';

SELECT * FROM Vista_ProveedoresTelevisa;

-- VISTA 4: Total entregado por cada material en el año 2000
CREATE VIEW Vista_proveedores AS
SELECT RFC, Cantidad, Fecha, Numero
FROM Entregan
WHERE Numero BETWEEN 5000 AND 5010 AND
RFC IN (
    SELECT RFC
    FROM Proveedores
    WHERE RazonSocial LIKE 'La%'
);

SELECT * FROM Vista_proveedores;

-- VISTA 5: Importe total de las entregas
CREATE VIEW Vista_ImporteEntregas AS
SELECT e.clave, m.descripcion, e.cantidad, m.precio, m.PorcentajeImpuesto,
       e.cantidad * m.precio * (1 + m.PorcentajeImpuesto/100) AS ImporteTotal
FROM entregan e, materiales m
WHERE e.clave = m.clave;

SELECT * FROM Vista_ImporteEntregas;

-- -------------------------------------------------------------------------------------------------------------------------
-- EJERCICIO CON CONSULTAS

-- Materiales entregados al proyecto "México sin ti no estamos completos"
SELECT DISTINCT m.clave, m.descripcion
FROM materiales m, entregan e, proyectos p
WHERE m.clave = e.clave
AND e.numero = p.numero
AND p.denominacion = 'México sin ti no estamos completos';

-- Materiales proporcionados por el proveedor "Acme tools"
SELECT DISTINCT m.clave, m.descripcion
FROM materiales m, entregan e, proveedores p
WHERE m.clave = e.clave
AND e.rfc = p.rfc
AND p.RazonSocial = 'Acme tools';

-- RFC de proveedores que durante el 2000 entregaron en promedio cuando menos 300 materiales
SELECT e.rfc
FROM entregan e
WHERE e.fecha BETWEEN '01/01/2000' AND '31/12/2000'
GROUP BY e.rfc
HAVING AVG(e.cantidad) >= 300;

-- Total entregado por cada material en el año 2000
SELECT m.clave, m.descripcion, SUM(e.cantidad) AS TotalEntregado
FROM materiales m, entregan e
WHERE m.clave = e.clave
AND e.fecha BETWEEN '01/01/2000' AND '31/12/2000'
GROUP BY m.clave, m.descripcion;

-- La Clave del material más vendido durante el 2001.
SELECT m.clave, SUM(e.cantidad) AS TotalEntregado
FROM materiales m, entregan e
WHERE m.clave = e.clave
AND e.fecha BETWEEN '01/01/2001' AND '31/12/2001'
GROUP BY m.clave
ORDER BY SUM(e.cantidad) DESC
LIMIT 1;


-- Productos que contienen el patrón 'ub' en su nombre.
SELECT *
FROM materiales
WHERE descripcion LIKE '%ub%';

-- Denominación y suma del total a pagar para todos los proyectos.
SELECT p.denominacion, 
       SUM(e.cantidad * m.precio * (1 + m.PorcentajeImpuesto/100)) AS TotalAPagar
FROM proyectos p, entregan e, materiales m
WHERE p.numero = e.numero
AND e.clave = m.clave
GROUP BY p.denominacion;

-- Denominación, RFC y RazonSocial de los proveedores que se suministran materiales al proyecto Televisa en acción 
-- que no se encuentran apoyando al proyecto Educando en Coahuila (Solo usando vistas).

-- Vista de proveedores de Televisa en acción
CREATE VIEW ProveedoresTelevisa AS
SELECT DISTINCT pr.rfc, pr.RazonSocial
FROM proveedores pr, entregan e, proyectos p
WHERE pr.rfc = e.rfc
AND e.numero = p.numero
AND p.denominacion = 'Televisa en acción';

-- Vista de proveedores de Educando en Coahuila
CREATE VIEW ProveedoresCoahuila AS
SELECT DISTINCT pr.rfc, pr.RazonSocial
FROM proveedores pr, entregan e, proyectos p
WHERE pr.rfc = e.rfc
AND e.numero = p.numero
AND p.denominacion = 'Educando en Coahuila';

-- Proveedores en Televisa que no están en Coahuila
SELECT p.denominacion, pt.rfc, pt.RazonSocial
FROM ProveedoresTelevisa pt, proyectos p
WHERE p.denominacion = 'Televisa en acción'
AND pt.rfc NOT IN (SELECT rfc FROM ProveedoresCoahuila);

-- Denominación, RFC y RazonSocial de los proveedores que se suministran materiales al proyecto Televisa en acción que no se encuentran 
-- apoyando al proyecto Educando en Coahuila (Sin usar vistas, utiliza not in, in o exists).
SELECT DISTINCT p.denominacion, pr.rfc, pr.RazonSocial
FROM proveedores pr, entregan e, proyectos p
WHERE pr.rfc = e.rfc
AND e.numero = p.numero
AND p.denominacion = 'Televisa en acción'
AND pr.rfc NOT IN (
    SELECT DISTINCT pr2.rfc
    FROM proveedores pr2, entregan e2, proyectos p2
    WHERE pr2.rfc = e2.rfc
    AND e2.numero = p2.numero
    AND p2.denominacion = 'Educando en Coahuila'
);

-- Costo de los materiales y los Materiales que son entregados al proyecto Televisa en acción 
-- cuyos proveedores también suministran materiales al proyecto Educando en Coahuila.
SELECT m.clave, m.descripcion, m.precio
FROM materiales m, entregan e, proyectos p, proveedores pr
WHERE m.clave = e.clave
AND e.numero = p.numero
AND e.rfc = pr.rfc
AND p.denominacion = 'Televisa en acción'
AND pr.rfc IN (
    SELECT DISTINCT e2.rfc
    FROM entregan e2, proyectos p2
    WHERE e2.numero = p2.numero
    AND p2.denominacion = 'Educando en Coahuila'
);

-- Nombre del material, cantidad de veces entregados y total del costo de dichas entregas por material de todos los proyectos.
SELECT m.descripcion, 
       COUNT(e.clave) AS VecesEntregado,
       SUM(e.cantidad * m.precio * (1 + m.PorcentajeImpuesto/100)) AS CostoTotal
FROM materiales m, entregan e
WHERE m.clave = e.clave
GROUP BY m.descripcion
ORDER BY CostoTotal DESC;