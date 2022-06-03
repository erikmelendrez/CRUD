const product = require("../models/product");

module.exports = (req,res)=>{
    let datoModificar = req.params.productID;
    let update = req.body;
    console.log(datoModificar);
    console.log(update);

    product.findOneAndUpdate(datoModificar, update, (err, products)=>{
        if(err) return res.status(500).send({
            message: `Error al realizar la petición ${err}` 
        });

        if(!products) return res.status(404).send({
            message : 'El producto no existe'                        //Melendrez Perez Erik Issac 18210502
        });
        res.status(200).send({product:products});
    }).lean();
}