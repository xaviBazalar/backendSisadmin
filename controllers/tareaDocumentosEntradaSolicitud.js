const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const Tarea= require('../models/tarea')
const TareaDocumentoEntrada= require('../models/tareaDocumentoEntrada')
const TareaDocumentosEntradaSolicitud = require('../models/tareaDocumentoEntradaSolicitud')

const tareaDocumentosEntradaSolicitudGet = async(req = request, res = response) => {

    const { randomId } = req.query;
    let query = { };
    if(randomId!==undefined){
        query = {"randomId":randomId}
    }

    //let query = {"tarea_documento":mongoose.Types. ObjectId(tarea_documento)}   ;
    
    /*if(tarea_documento===undefined){
        query = { };
    }*/
    

    const [ total, tarea_documentos_entrada_solicitud ] = await Promise.all([
        TareaDocumentosEntradaSolicitud.countDocuments(query),
        TareaDocumentosEntradaSolicitud.find(query).
        populate( { path: "tarea_documento",model:TareaDocumentoEntrada})
    ]);

    res.json({
        total,
        tarea_documentos_entrada_solicitud
    });
}

const tareaDocumentosEntradaSolicitudPost = async(req, res = response) => {

    
    const { tarea_documento, randomId, validado, url_ref,observacion} = req.body;
    const tareaDocumentoEntradaSolicitud = new TareaDocumentosEntradaSolicitud({ tarea_documento, randomId, validado, url_ref ,observacion });

    // Guardar en BD
    await tareaDocumentoEntradaSolicitud.save();

    res.json({
        tareaDocumentoEntradaSolicitud
    });
}

const tareaDocumentosEntradaSolicitudPut = async(req, res = response) => {

    const { id } = req.params;

    const { validado, url_ref, observacion } = req.body;

    const dataUpdate={
        _id:id,
        validado:validado,
        url_ref:url_ref,
        observacion:observacion
    }


    const tareaDocumentoEntrada = await TareaDocumentosEntrada.findByIdAndUpdate( id, dataUpdate );

    res.json(tareaDocumentoEntrada);
}

const tareaDocumentosEntradaSolicitudPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}


module.exports = {
    tareaDocumentosEntradaSolicitudGet,
    tareaDocumentosEntradaSolicitudPost,
    tareaDocumentosEntradaSolicitudPut,
    tareaDocumentosEntradaSolicitudPatch,
}