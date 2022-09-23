const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Contrato = require('../models/contrato');
const Gerencia = require('../models/gerencia');

const contratosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { };

    /*const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite )).populate( { path: "rol" })
    ]);*/

    Contrato.find({}, function (err, contratos) {
        Gerencia.populate(contratos, { path: "gerencia" }, function (err, contratos) {
          res.json({
                contratos,
            });
        });
      });

    /*res.json({
    total,
        usuarios
    });*/
}

const contratosPost = async(req, res = response) => {

    const { contradoid,  contrato} = req.body;
    const contrato_ = new Contrato({ contradoid, contrato });

    // Guardar en BD
    await contrato_.save();

    res.json({
        contrato_
    });
}

const contratosPut = async(req,res = response) => {
    //const { id } = req.params;
    const { id,contradoid,contrato,estado} = req.body;

    const dataUpdate={
        _id:id,
        contradoid:contradoid,
        contrato:contrato,
        estado:estado
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