const array = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

const promedio = (arreglo) => {
    let acum = 0
    for (elemento of arreglo) {
        acum += elemento;
    }

    return acum / arreglo.length;
}

console.log(promedio(array));

const crearArchTexto = (mensaje) => {
    const file_system = require('fs'); 
    file_system.writeFileSync('hola.txt', mensaje)
}

crearArchTexto('hola como estas')
