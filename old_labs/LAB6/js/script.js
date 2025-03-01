//init materialize
M.AutoInit();

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, options);
  });

//manzanas
const botonMenosManzana = document.getElementById("menos-manzana");
const botonMasManzana = document.getElementById("mas-manzana");
const unidadesManzana = document.getElementById("unidades-manzana");

//camotes
const botonMenosCamotes = document.getElementById("menos-camote");
const botonMasCamotes = document.getElementById("mas-camote");
const unidadesCamotes = document.getElementById("unidades-camote");


//camotes
const botonMenosPeras = document.getElementById("menos-peras");
const botonMasPeras = document.getElementById("mas-peras");
const unidadesPeras = document.getElementById("unidades-peras");


const psubtotal= document.getElementById("subtotal")
const precioManzanas = 15;
const precioCamotes = 10;
const precioperas = 20;
var subtotal = 0
var total = 0
var precioTotalManzanas = 0;

botonMasManzana.onclick = () => {
    let unidades = unidadesManzana.textContent;
    unidades++
    console.log(unidades);
    unidadesManzana.textContent = unidades
    actualizarSubtotal(precioManzanas)
}

botonMenosManzana.onclick = () => {
    let unidades = unidadesManzana.textContent;
    if (unidades == 0) {
        return alert("no puedes comprar -1 unidades")
    }
    unidades--
    unidadesManzana.textContent = unidades
    actualizarSubtotal(-precioManzanas)
}

botonMasCamotes.onclick = () => {
    let unidades = unidadesCamotes.textContent;
    unidades++
    console.log(unidades);
    unidadesCamotes.textContent = unidades
    actualizarSubtotal(precioCamotes)
}

botonMenosCamotes.onclick = () => {
    let unidades = unidadesCamotes.textContent;
    if (unidades == 0) {
        return alert("no puedes comprar -1 unidades")
    }
    unidades--
    unidadesCamotes.textContent = unidades
    actualizarSubtotal(-precioCamotes)
}

botonMasPeras.onclick = () => {
    let unidades = unidadesPeras.textContent;
    unidades++
    console.log(unidades);
    unidadesPeras.textContent = unidades
    actualizarSubtotal(precioperas)
}

botonMenosPeras.onclick = () => {
    let unidades = unidadesPeras.textContent;
    if (unidades == 0) {
        return alert("no puedes comprar -1 unidades")
    }
    unidades--
    unidadesPeras.textContent = unidades
    actualizarSubtotal(-precioperas)
}

const actualizarSubtotal = (precio) => {
    console.log(precio)
    subtotal += precio 
    console.log(subtotal)
    psubtotal.textContent = subtotal;
}


//segunda parte del lab
function mOver(obj) {
    obj.innerHTML = "Click para mas"
}
  
  function mOut(obj) {
    obj.innerHTML = "15 COSAS SOBRE MI"
}

function stilo(obj) {
    obj.style.fontStyle = 'italic'
}