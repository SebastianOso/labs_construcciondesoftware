const express = require('express'); //para usar express, se necesita un requiere, se guarda en una constante
const app = express();// se inicializa la estancia de express y se inicia el servidor

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const session = require('express-session');

app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));//para que todas mis rutas se use body parser

//Middleware
//si queremos agregar algo a la aplicacion se agrega un middleware
//registas el middleware y todo eso se registra en toda la aplicacion
//para declarar un middleware es la sig nomenclatura

app.use((request, response, next) => { //next es una funcion de express que lo manda a la siguiente cosa
    //request tiene toda la informacion de la peticion 
    //response tiene toda la informaion de la respuesta que quieres mandar
    //que salga middleware en la consola
    console.log('Middleware!');
    
    //Le permite a la petición avanzar hacia el siguiente middleware
    next(); 
    
});

//nos vamos de lo especifico a lo general en express
//Este middleware se registra solo en la ruta /chewy
//este middleware se registra para /chewy, agrega todo lo demas que lleva chewy

const rutasPersonajes = require('./routes/personajes.routes');
app.use('/personajes', rutasPersonajes);

const rutasPeliculas = require('./routes/peliculas.routes');
app.use('/peliculas', rutasPeliculas);

const rutasUsuarios = require('./routes/users.routes');
app.use('/users', rutasUsuarios);

//es un composite
app.use((request, response, next) => {
    response.status(404).send('Página no encontrada');
});


app.listen(3000);