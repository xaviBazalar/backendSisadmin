const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Contrato = require('../models/contrato');
const Tarea = require('../models/tarea');
const TareaContrato = require('../models/tareaContrato');

const tareasContratoGet = async(req = request, res = response) => {
 
    const {contrato} = req.query;
    let query = { contrato:contrato};
    if(contrato==""){
        query = {}
    }

    const [ total, contratos ] = await Promise.all([
        TareaContrato.countDocuments(query),
        TareaContrato.find(query).
        populate( { path: "tarea",model:Tarea}).
        populate( { path: "contrato",model:Contrato}).sort('contrato')
    ]);


    res.json({
        total,
        contratos
    });

}

const tareasContratoPost = async(req, res = response) => {

    const { tarea,  contrato} = req.body;
    const tarea_contrato = new TareaContrato({ tarea, contrato });

    // Guardar en BD
    await tarea_contrato.save();

    res.json({
        tarea_contrato
    });
}


const tareasContratoPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}



module.exports = {
    tareasContratoGet,
    tareasContratoPost,
    tareasContratoPatch,
}