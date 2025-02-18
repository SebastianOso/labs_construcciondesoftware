// Crear contenedores para los resultados
let body = document.body;
let contenedoresHTML = `
    <div id="ejercicio1"></div>
    <div id="ejercicio2"></div>
    <div id="ejercicio3"></div>
    <div id="ejercicio4"></div>
    <div id="ejercicio5"></div>
    <div id="ejercicio6"></div>
`;

let contenedorDiv = document.createElement("div");
contenedorDiv.innerHTML = contenedoresHTML;
body.appendChild(contenedorDiv);

// Ejercicio 1
let numeroTabla = Number(prompt("1. Escoge un número para saber su cuadrado y cubos, en secuencia"));

if (isNaN(numeroTabla) || numeroTabla < 1) {
    document.getElementById("ejercicio1").innerHTML = "<p>Por favor, introduce un número válido mayor que 0.</p>";
} else {
    let tablaHTML = "<h1>Resultado ejercicio 1</h1>";
    tablaHTML += "<table border='1'>";
    tablaHTML += "<tr><th>Número</th><th>Cuadrado</th><th>Cubo</th></tr>";
    for (let i = 0; i <= numeroTabla; i++) {
        let cuadrado = i * i;
        let cubo = i * i * i;
        tablaHTML += `<tr><td>${i}</td><td>${cuadrado}</td><td>${cubo}</td></tr>`;
    }
    tablaHTML += "</table>";
    document.getElementById("ejercicio1").innerHTML = tablaHTML;
}

// Ejercicio 2
let min = 1;
let max = 9;
let numeroRandom1 = Math.floor(Math.random() * (max - min + 1)) + min;
let numeroRandom2 = Math.floor(Math.random() * (max - min + 1)) + min;
console.log(numeroRandom1);
console.log(numeroRandom2);
let suma = numeroRandom1 + numeroRandom2;
console.log(suma);
let intentos = 0;
while (true) {
    let tiempoInicial = performance.now();
    let numeroAdivinanza = Number(prompt("Adivina la suma de los 2 números random (e.g., 3 + 3 = 6, el número a adivinar es el 6)"));

    if (isNaN(numeroAdivinanza) || numeroAdivinanza < 1) {
        document.getElementById("ejercicio2").innerHTML = "<p>Por favor, introduce un número válido mayor que 0.</p>";
        continue;
    } else if (numeroAdivinanza == suma) {
        let tiempoFinal = performance.now();
        let tiempoTranscurrido = tiempoFinal - tiempoInicial;
        let tiempoSegundos = tiempoTranscurrido / 1000;

        let resultadoHTML = "<h1>Resultado ejercicio 2</h1>";
        resultadoHTML += "<p>¡Correcto! Adivinaste el número.</p>";
        resultadoHTML += `<p>lo intentaste ${intentos} veces</p>`;
        resultadoHTML += `<p>Lo hiciste en ${tiempoSegundos.toFixed(3)} segundos.</p>`;
        document.getElementById("ejercicio2").innerHTML = resultadoHTML;
        break;
    } else {
        intentos++
        continue
    }
}

document.write("<p>Los ejercicios de funciones se checan con assert y se ve su resultado en consola</p>")

function contador(lista){
    let contadorNegativos = 0;
    let contadorCeros = 0;
    let contadorPositivos = 0;
    for (let elemento of lista) {
        if (elemento < 0){
            contadorNegativos++
        } else if (elemento == 0) {
            contadorCeros++;
        } else {
            contadorPositivos++
        }
    }

    return {
        negativos: contadorNegativos,
        ceros: contadorCeros,
        positivos: contadorPositivos
    };
}

// Prueba 1: Lista con números negativos, ceros y positivos
let lista1 = [-1, 0, 1, -2, 2, 0];
let resultado1 = contador(lista1);
console.assert(resultado1.negativos === 2, "Error en el contador de negativos"); 
console.assert(resultado1.ceros === 2, "Error en el contador de ceros");       
console.assert(resultado1.positivos === 2, "Error en el contador de positivos"); 

let lista2 = [1, 2, 3];
let resultado2 = contador(lista2);
console.assert(resultado2.negativos === 0, "Error en el contador de negativos"); 
console.assert(resultado2.ceros === 0, "Error en el contador de ceros");         
console.assert(resultado2.positivos === 3, "Error en el contador de positivos"); 

let lista3 = [];
let resultado3 = contador(lista3);
console.assert(resultado3.negativos === 0, "Error en el contador de negativos"); 
console.assert(resultado3.ceros === 0, "Error en el contador de ceros");         
console.assert(resultado3.positivos === 0, "Error en el contador de positivos"); 

console.log("Todas las pruebas pasaron correctamente.");

function promedio(matriz){
    let promedioRenglones = [];

    for(renglon of matriz){
        let suma = 0;
        for(elemento of renglon){
                suma += elemento;
        }
        let promedio = renglon.length === 0 ? 0 : suma / renglon.length;
        promedioRenglones.push(promedio)
    }
    return promedioRenglones
}

// Prueba 1: Matriz con varios renglones
let matriz1 = [
    [1, 2, 3],       // Promedio: (1 + 2 + 3) / 3 = 2
    [4, 5, 6, 7],    // Promedio: (4 + 5 + 6 + 7) / 4 = 5.5
    [10, 20]         // Promedio: (10 + 20) / 2 = 15
];
let resultado11 = promedio(matriz1);
console.assert(
    JSON.stringify(resultado11) === JSON.stringify([2, 5.5, 15]),
    "Error en la Prueba 1"
);

// Prueba 2: Matriz vacía
let matriz2 = [];
let resultado22 = promedio(matriz2);
console.assert(
    JSON.stringify(resultado22) === JSON.stringify([]),
    "Error en la Prueba 2"
);

// Prueba 3: Renglones vacíos
let matriz3 = [[], [1, 2], []];
let resultado33 = promedio(matriz3);
console.assert(
    JSON.stringify(resultado33) === JSON.stringify([0, 1.5, 0]),
    "Error en la Prueba 3"
);

// Prueba 4: Matriz con un solo renglón
let matriz4 = [[10, 20, 30]];
let resultado44 = promedio(matriz4);
console.assert(
    JSON.stringify(resultado44) === JSON.stringify([20]),
    "Error en la Prueba 4"
);

// Prueba 5: Matriz con números negativos
let matriz5 = [
    [-1, -2, -3],    // Promedio: (-1 - 2 - 3) / 3 = -2
    [0, 0, 0],       // Promedio: (0 + 0 + 0) / 3 = 0
    [5, -5]          // Promedio: (5 - 5) / 2 = 0
];
let resultado55 = promedio(matriz5);
console.assert(
    JSON.stringify(resultado55) === JSON.stringify([-2, 0, 0]),
    "Error en la Prueba 5"
);

console.log("Todas las pruebas pasaron correctamente.");

//ejercicio 6
const fizzBuzzCreador = {
    limit: 0,

    init: (limit) => {
        this.limit = limit;  // Simula un constructor
    },

    generate: () => {
        let result = [];
        for (let i = 1; i <= this.limit; i++) {
            if (i % 3 === 0 && i % 5 === 0) {
                result.push("FizzBuzz");
            } else if (i % 3 === 0) {
                result.push("Fizz");
            } else if (i % 5 === 0) {
                result.push("Buzz");
            } else {
                result.push(i);
            }
        }
        return result;
    },

    mostrar: () => {
        //extraido de https://www.w3schools.com/js/js_array_methods.asp
        const outputDiv = document.getElementById("output");
        outputDiv.innerHTML = this.generate().join("<br>");
    }
}

fizzBuzzCreador.init(100);
fizzBuzzCreador.mostrar();