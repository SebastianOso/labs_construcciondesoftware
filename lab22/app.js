const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const session = require('express-session');

app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como Ã©ste', 
    resave: false, //La sesiÃ³n no se guardarÃ¡ en cada peticiÃ³n, sino sÃ³lo se guardarÃ¡ si algo cambiÃ³ 
    saveUninitialized: false, //Asegura que no se guarde una sesiÃ³n para una peticiÃ³n que no lo necesita
}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const multer = require('multer');

//fileStorage: Es nuestra constante de configuraciÃ³n para manejar el almacenamiento
const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        //'uploads': Es el directorio del servidor donde se subirÃ¡n los archivos 
        callback(null, 'public/uploads');
    },
    filename: (request, file, callback) => {
        //aquÃ­ configuramos el nombre que queremos que tenga el archivo en el servidor, 
        //para que no haya problema si se suben 2 archivos con el mismo nombre concatenamos el timestamp
        callback(null, new Date().getMilliseconds() + file.originalname);
    },
});

//En el registro, pasamos la constante de configuraciÃ³n y
//usamos single porque es un sÃ³lo archivo el que vamos a subir, 
//pero hay diferentes opciones si se quieren subir varios archivos. 
//'archivo' es el nombre del input tipo file de la forma
app.use(multer({ storage: fileStorage }).single('archivo')); 

const csrf = require('csurf');
const csrfProtection = csrf();
app.use(csrfProtection); 

const rutasUsuarios = require('./routes/users.routes');
app.use('/users', rutasUsuarios);

const rutasPersonajes = require('./routes/personajes.routes');
app.use('/personajes', rutasPersonajes);

app.use((request, response, next) => {
    console.log('Otro middleware!');
    
    //Manda la respuesta
    response.status(404).send('Recurso no encontrado'); 
});

app.listen(3000);
                    