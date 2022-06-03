'use stric'

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const hbs = require('express-handlebars');

const app = express();

//Body parser
app.use(express.urlencoded({extended:true}));
app.use(express.json());  

//Recursos Statics / Publicos
app.use('/static',express.static('public'));

//Motor de vistas
app.engine('.hbs', hbs.engine({
    defaultLayout : 'index', 
    extname : '.hbs'
}))
                                        /*¡¡MELENDREZ PEREZ ERIK ISSAC!!*/
app.set('view engine', '.hbs');

//Router out app
const router = require('./routes/routes');
app.use('/',router);

//Consexion a la Base de Datos
mongoose.connect(config.db,config.urlParser, (err,res)=>{
    if(err){
        return console.log(`Error al conectar a la base de datos ${err}`);
    }
    console.log('Conexión a la Base de Datos exitosa')

    app.listen(config.port, ()=>{
        console.log(`Ejecutando en http://localhost:${config.port}`);
    });
});