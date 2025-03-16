-- 1.- Actrices de “Las brujas de Salem”.
SELECT A.nombre
FROM Actor A, Elenco E
WHERE A.Nombre = E.Nombre
AND A.Sexo = 'F' AND E.Titulo = 'Las brujas de Salem'

SELECT Nombre
FROM Actor
WHERE Sexo = 'F'
AND Nombre in 	(
		SELECT Nombre
		FROM Elenco
		WHERE Titulo = 'Las Brujas de Salem'
		)
-- 2.- Nombres de los actores que aparecen en películas producidas por MGM en 1995.
SELECT E.Nombre
FROM Elenco E, Pelicula P
WHERE E.titulo = P.titulo AND P.año = E.año
AND P.año = 1995 AND P.nomestudio = 'MGM';


SELECT Nombre
FROM Elenco
WHERE Nombre IN (
		SELECT titulo
		FROM Pelicula
		WHERE nomestudio='MGM' AND año=1995
		)

-- 3.- Películas que duran más que “Lo que el viento se llevó” (de 1939).
SELECT titulo
FROM Pelicula
WHERE duración 


SELECT titulo
FROM Pelicula
WHERE duración > (
		  SELECT titulo
		  FROM Pelicula
	 	  WHERE titulo='Lo que el viento se llevo' AND año = 1939
	 	 )
-- 4.- Productores que han hecho más películas que George Lucas.

SELECT Pr.nombre, COUNT(Pe.titulo)
FROM Productor Pr, Pelicula Pe
WHERE Pr.idproductor = Pe.idproductor
GROUP BY P.nombre
HAVING COUNT() >  (
		  SELECT Pr.nombre COUNT() 
		  FROM Productor Pr, Pelicula Pe
		  WHERE Pr.idproductor = Pe.idproductor 
		  AND P.nombre = 'George Lucas'
		  )
ORDER BY COUNT(Pe.titulo) DESC

-- 5.- Nombres de los productores de las películas en las que ha aparecido Sharon Stone.
SELECT Pr.Nombre
FROM Productores pr, Peliculas Pe, Elenco E
WHERE Pr.idproductor = Pe.idproductor 
AND Pe.titulo = E.titulo
AND Pe.año = E.año
AND E.nombre = 'Sharon Stone';


SELECT Pr.nombre
FROM Productor Pr, Pelicula Pe
WHERE PR.idproductor = P.idproductor
AND p.titulo IN (
		SELECT Pe.titulo
		FROM Elenco E
		WHERE E.nombre = 'Sheron Stone'
		)

-- 6.- Título de las películas que han sido filmadas más de una vez
SELECT Titulo, COUNT(*) AS 'Numero de peliculas'
FROM Pelicula
GROUP BY Titulo
HAVING COUNT(*)>1
ORDER BY DESC;