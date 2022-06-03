const express = require('express');
const res = require('express/lib/response');
const Product = require('../models/product')
const path = require('path');
const product = require('../models/product');
const req = require('express/lib/request');

const router = express.Router();

module.exports = router;

//Ruta para pagina Home
router.get('/', (req,res)=>{
    res.status(200).send('Hola mundo soy home');
    res.render('home')
});

//Consulta de todos los datos
router.get('/api/product',(req,res)=>{
    Product.find({},(err, products)=>{
        if(err) return res.status(500).send({
            message: `Error al realizar la petición ${err}` 
        });

        if(!products) return res.status(404).send({
            message : 'No existen productos'                        //Melendrez Perez Erik Issac 18210502
        });

        res.status(200).send({
            products: [products]
        });
    }).lean();
});

//Consulta por filtro
router.get('/api/product/:datoBusqueda',(req,res)=>{
    let datoBusqueda = req.params.datoBusqueda;
    Product.findById(datoBusqueda, (err, todoOK)=>{
        if(err) return res.status(500).send({
            message: `Error al realizar la petición ${err}` 
        });

        if(!todoOK) return res.status(404).send({
            message : 'El producto no existe'                        //Melendrez Perez Erik Issac 18210502
        });
        res.status(200).send({product:todoOK});
    }).lean();
});

//Modificar Registro PUT
const putProduct = require('../controllers/putProduct');
router.put('/api/product/:productId', putProduct);

//Instertar valores a la BD
router.post('/api/product', (req, res) =>{

    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.avatar;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;
    
    console.log(req.body);
    
    product.save((err, productStored) =>{
    
    if (err) return res.status(500).send ({
    message: `Èrror al realizar la petición ${err}`
    });
    
    res.status(200).send({product:productStored});
    });
    });

//Ruta para pagina no encontrada
router.use((req,res)=>{
    res.status(404).send('Pagina no encontrada ERROR 404');
});