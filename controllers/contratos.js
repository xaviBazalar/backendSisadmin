const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Contrato = require('../models/contrato');
const Gerencia = require('../models/gerencia');
const Usuario = require('../models/usuario');



const contratosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0,estado="",page=1,n_contrato="",nro_contrato="" } = req.query;
    let query = {};//contrato:{$regex:'.*K,*'}


    if(estado!==undefined && estado!=""){
        query.estado=true
    }

    if(n_contrato!=""){
        query.contrato={$regex:`.*${n_contrato.replace("amp;","&")},*`};//
        let contratos_por_nc=await Contrato.aggregate([

    
            { "$group": {
                "_id": {
                    "nombre": "$contrato",
                    "nro_contrato": "$contradoid",
                    "id": "$_id",
                },
                "total": { "$sum": 1 }
            }}
        ]).match({"_id.nombre": { $regex: `.*${n_contrato.replace("amp;","&")},*` }})
    }

    if(nro_contrato!=""){
        query.contradoid={$regex:`.*${nro_contrato.replace("amp;","&")},*`};//
    }
   

    

    /*const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite )).populate( { path: "rol" })
    ]);*/

    /*Contrato.find(query, function (err, contratos) {
        Gerencia.populate(contratos, { path: "gerencia" }, function (err, contratos) {
          res.json({
                contratos,
            });
        });
      });*/
      const options = {
        page: page,
        limit: 10,
        populate:[
            { path: "gerencia",model:Gerencia},
            { path: "adc",model:Usuario}
        ]
      };


    const [ total, contratos ] = await Promise.all([
        Contrato.countDocuments(query),
        Contrato.paginate(query,options)
    ]);

    res.json({
        total,
        contratos
    });
}

const contratosPost = async(req, res = response) => {

    const { contradoid,  contrato, adc} = req.body;
    const contrato_ = new Contrato({ contradoid, contrato, adc });

    // Guardar en BD
    await contrato_.save();

    res.json({
        contrato_
    });
}

const contratosPut = async(req,res = response) => {
    //const { id } = req.params;
    const { id,contradoid,contrato,estado,adc} = req.body;

    const dataUpdate={
        _id:id,
        contradoid:contradoid,
        contrato:contrato,
        estado:estado,
        adc:adc
    }

    const contrato_ = await Contrato.findByIdAndUpdate( id, dataUpdate );

    res.json(contrato_);
}



const contratosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}



module.exports = {
    contratosGet,
    contratosPost,
    contratosPut,
    contratosPatch,
}