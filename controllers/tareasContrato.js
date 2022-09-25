const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Contrato = require('../models/contrato');
const Tarea = require('../models/tarea');
const TareaContrato = require('../models/tareaContrato');
const Usuario = require('../models/usuario')

const tareasContratoGet = async(req = request, res = response) => {
 
    const {contrato} = req.query;
    let query = { contrato:contrato};
    if(contrato==""){
        query = {}
    }else{
        query.estado=true
    }



    const [ total, contratos ] = await Promise.all([
        TareaContrato.countDocuments(query),
        TareaContrato.find(query).
        populate( { path: "gst",model:Usuario}).
        populate( { path: "bko",model:Usuario}).
        populate( { path: "tarea",model:Tarea}).
        populate( { path: "contrato",model:Contrato}).sort('contrato')
    ]);


    res.json({
        total,
        contratos
    });

}

const tareasContratoPost = async(req, res = response) => {

    const { tarea,  contrato,gst,bko} = req.body;
    const tarea_contrato = new TareaContrato({ tarea, contrato,gst,bko });

    // Guardar en BD
    await tarea_contrato.save();

    res.json({
        tarea_contrato
    });
}

const tareasContratoPut = async(req,res = response) => {
    //const { id } = req.params;
    const { id,tarea,contrato,gst ,bko,estado} = req.body;

    const dataUpdate={
        _id:id,
        tarea:tarea,
        contrato:contrato,
        gst:gst,
        bko:bko,
        estado:estado
    }

    console.log(dataUpdate)

    const tareaContrato = await TareaContrato.findByIdAndUpdate( id, dataUpdate );

    res.json(tareaContrato);
}

const tareasContratoPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}



module.exports = {
    tareasContratoGet,
    tareasContratoPost,
    tareasContratoPut,
    tareasContratoPatch,
}