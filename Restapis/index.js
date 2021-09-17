const express =  require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({ path:'variables.env'});


//iniciar cors
const cors = require('cors');


//conectar a mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true 
});


//crear elservidor
const app = express();

// habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//definir un dominio único olista blanca
const listwhite = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) =>{
        const existe = listwhite.some(dominio => dominio = origin);
        if(existe){
            callback(null, true);
        }else{
            callback( new Error('No permitido por CORS'));
        }
    }
}


//habilitar cors
app.use(cors(corsOptions));


//rutas de la app

app.use('/', routes());

//cargar imágenes
app.use(express.static('uploads'));

//puerto
app.listen(5000);