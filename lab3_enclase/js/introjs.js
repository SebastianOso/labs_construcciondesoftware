// consola (log, info, warn, error, assert)
console.log("hola mundo wookie");
console.info("Aqui andamos aprendiendo");
console.warn("Esto es una advertencia");
console.error("dsajfndjskancjkdankcsanl");
console.assert(1 == 1);
console.assert(1 === 1);
console.assert(1 == "1");
console.assert(1 === "1");
console.assert(1 == true);
console.assert(1 === true);

//variables constantes
var wookie = "Cheewbaca"; //forma antigua,  no es tan segura
let otro_wookie = "Tarful"; //forma moderna

console.log(otro_wookie);

const precio = 99.99;

//alcance de las variables
for (var i = 0; i < 10; i++){
    console.log(i);
}

console.log(i)  