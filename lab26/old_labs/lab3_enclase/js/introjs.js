//** 
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
for (let i = 0; i < 10; i++){
    console.log(i);
}

//alert, prompt, confirm
//alert("fdfdsa");
//const nombre = prompt("¿Como te llamas?");
//const is_hambre = confirm("¿Tienes hambre?");

//funciones tradicionales
function imprime_status() {
    let respuesta = ""
    if (is_hambre){
        respuesta = " tiene hambre"
    }
    console.log(nombre + respuesta);

}

//imprime_status();



//**funciones modernas**
//si no tiene nombre es una funcion anonima
// a esta constante le asignas una funcion, si noes const le puedes asignar otra funcion
// pro ejemplo por cada click que le puedes dar a un boton, le puedes asignar una funcion diferente
const mi_funcion = () => {
    console.log("dcndsjkancjd desde una funcion anonima")
}

//**arreglos**

const arreglo = ["Elemento"]; //no me va a dejar asignarle otro arreglo o funcion a esta variable
                              //es constante la direccion de memoria del arreglo

const arreglo2 = new Array();

arreglo.push("Otro elemento");

arreglo[10] = "Uno más";//hace 11 localidades y en la 10 pone uno más

//**arreglos asociativos**
arreglo["uno"] = 5;//a la localidad "uno" le asigna el valor 5 //los arreglos en js son tablas de hash  uno:5, se vuelve una propiedad del arreglo mas que un elemento del arreglo

for (let i=0; i< arreglo.length;i++){
    console.log(arreglo[i]);
}

console.log("operador in")

for (let posicion in arreglo){ //imprime la posicion del arreglo
    console.log(posicion)
}

for (let valor of arreglo){ //imprime los valores del arrelo
    console.log(valor)
}

//objetos
const objeto = {
    //conjunto asociado de llaver a valores
    atributo:"hola",
    atributo2: "bye",
    atribut3: [],
    objeto: {}
}

objeto.atributos = "otra declaracion"

for (let i=0; i< arreglo.length;i++){
    console.log(arreglo[i]);
}

console.log("operador in")

for (let posicion in objeto){ //imprime la posicion del arreglo
    console.log(posicion)
}

//modificar html
const boton = document.getElementById("boton_imagen");
const poner_imagen_1 = () => { //muestra la imagen de chewy guapo(fondo azul)
    const span_imagen = document.getElementById("imagen_chewy");
    span_imagen.innerHTML =  "<img alt='chewy guapo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_sv4QSiFbDQQkDbA9bx6uP5b0pn4Gza9OmA&s'>"
    boton.onclick = poner_imagen_2
}

const poner_imagen_2 = () => { //muestra la imagen de chewy guapo(fondo azul)
    const span_imagen = document.getElementById("chewy_grenudo");
    span_imagen.innerHTML =  "<img alt='chewy guapo' src='https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/chewy-in-the-snow-tracy-workman.jpg'>"
    boton.onclick = poner_imagen_3;
}

const poner_imagen_3 = () => { //muestra la imagen de chewy guapo(fondo azul)
    const span_imagen = document.getElementById("chewy_enojado");
    span_imagen.innerHTML =  "<img alt='chewy guapo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEGBNffYMwoN4tV25JuxIycp3McazOr_FCGw&s'>"

}

//una buena practica es hacer poquito, e irlo validando poco a poco
//se hace funcion anonima
//refactor extract function
boton.onclick = poner_imagen_1; //no se le pone corchetes para no ejecutar la fucnion cuando se abra el documento