const express =  require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


//iniciar cors
const cors = require('cors');


//conectar a mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/resapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});


//crear elservidor
const app = express();

// habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//habilitar cors
app.use(cors());


//rutas de la app

app.use('/', routes());
//puerto
app.listen(5000);