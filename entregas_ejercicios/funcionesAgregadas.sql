-- El ingreso total recibido por cada actor, sin importar en cuantas películas haya participado.
SELECT Nombre, SUM(Sueldo)
FROM Elenco

-- El monto total destinado a películas por cada Estudio Cinematográfico, durante la década de los 80's.	
SELECT nomStudio, SUM(presupuesto) AS 'monto total'
FROM Pelicula
WHERE año BETWEEN 1980 and 1990
GROUP BY nomStudio
ORDER BY SUM(presupuesto) DESC;


-- Nombre y sueldo promedio de los actores (sólo hombres) que reciben en promedio un pago superior a 5 millones de dolares por película.
SELECT E.nombre, AVG(E.sueldo) as 'Sueldo promedio'
FROM Elenco E, Actor A
WHERE E.nombre = A.nombre AND A.sexo = 'H'
GROUP BY E.nombre
HAVING AVG(E.sueldo) > 5000000
ORDER BY AVG(E.sueldo) DESC



-- Título y año de producción de las películas con menor presupuesto. (Por ejemplo, la película de Titanic se ha producido en varias veces entre la lista de películas estaría la producción de Titanic y el año que fue filmada con menor presupuesto).

SELECT titulo, año, MIN(presupuesto) as 'Presupuesto minimo'
FROM Pelicula
GROUP BY titulo 


-- Mostrar el sueldo de la actriz mejor pagada.
SELECT E.nombre, MAX(E.sueldo) as 'Sueldo máximo promedio'
FROM Elenco E, Actor A
WHERE E.nombre = A.nombre AND A.sexo = 'F'
GROUP BY E.nombre
ORDER BY MAX(E.sueldo) DESC
LIMIT 1;