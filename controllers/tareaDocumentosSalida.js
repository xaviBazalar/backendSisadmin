const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Schema } = require('mongoose');
const mongoose = require('mongoose');


const HistorialResultadoSolicitud = require("../models/historialResultadoSolicitud")
const DocumentoSalida = require('../models/documentoSalida');
const Tarea= require('../models/tarea')
const Contrato= require('../models/contrato')
const TareaDocumentosSalida = require('../models/tareaDocumentoSalida')

const tareaDocumentosSalidaGet = async(req = request, res = response) => {

    const { tarea,contrato } = req.query;
    let query = {"tarea":mongoose.Types. ObjectId(tarea),"contrato":mongoose.Types. ObjectId(contrato)}   ;
    
    if(tarea===undefined){
        query = { };
    }

    const [ total, tarea_documentos_salida ] = await Promise.all([
        TareaDocumentosSalida.countDocuments(query),
        TareaDocumentosSalida.find(query).
        populate( { path: "tarea",model:Tarea}).
        populate( { path: "documento_salida",model:DocumentoSalida }).
        populate( { path: "contrato",model:Contrato })
    ]);

    res.json({
        total,
        tarea_documentos_salida
    });
}

const tareaDocumentosSalidaPost = async(req, res = response) => {

    /*const [ solicitudes ] = await Promise.all([
        Solicitud.find().limit(1).sort({$natural:-1})
    ]);

    let idsecuencia=solicitudes[0].idsecuencia+1
    const { gerencia, contrato, tarea, gst ,bko,estado_solicitud,estado_resultado,observacion,fecha_solicitud,fecha_inicio} = req.body;
    const solicitud = new Solicitud({ gerencia, contrato, tarea, gst ,bko,estado_solicitud,estado_resultado,observacion,fecha_solicitud,fecha_inicio,idsecuencia });

    // Guardar en BD
    await solicitud.save();

    res.json({
        solicitud
    });*/
}

const tareaDocumentosSalidaPut = async(req, res = response) => {

    const { id } = req.params;

    const { validado, url_ref, observacion } = req.body;

    const dataUpdate={
        _id:id,
        validado:validado,
        url_ref:url_ref,
        observacion:observacion
    }


    const tareaDocumentoSalida = await TareaDocumentosSalida.findByIdAndUpdate( id, dataUpdate );

    res.json(tareaDocumentoSalida);
}

const tareaDocumentosSalidaPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}


module.exports = {
    tareaDocumentosSalidaGet,
    tareaDocumentosSalidaPost,
    tareaDocumentosSalidaPut,
    tareaDocumentosSalidaPatch,
}