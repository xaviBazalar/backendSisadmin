const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Schema } = require('mongoose');
const mongoose = require('mongoose');



const Tarea= require('../models/tarea')
const Contrato= require('../models/contrato')
const DocumentacionSolicitud = require('../models/documentacionSolicitud')

const documentacionSolicitudGet = async(req = request, res = response) => {

    const { tarea,contrato,page=1 } = req.query;
    let query = {}   ;
    
    if(tarea===undefined){
        query = { };
    }else if(tarea!=""){
        query = {"tarea":mongoose.Types. ObjectId(tarea),"contrato":mongoose.Types. ObjectId(contrato)}   ;
    }
    
    const optionsPag = {
        page: page,
        limit: 10,
        populate:[
            { path: "tarea",model:Tarea},
            { path: "contrato",model:Contrato}
        ]
      };//match:{ name:query_filter},

    const [ total, documentacion_solicitudes ] = await Promise.all([
        DocumentacionSolicitud.countDocuments(query),
        DocumentacionSolicitud.paginate(query,optionsPag)
        //populate( { path: "tarea",model:Tarea}).
        //populate( { path: "contrato",model:Contrato})
        //populate( { path: "documento_entrada",model:DocumentoEntrada })
    ]);

    res.json({
        total,
        documentacion_solicitudes
    });
}

const documentacionSolicitudPost = async(req, res = response) => {

    const { tarea,nombre_documento,contrato,estado,observacion } = req.body;
    const documentacion_solicitud= new DocumentacionSolicitud({ tarea, nombre_documento, contrato, estado, observacion });

    // Guardar en BD
    await documentacion_solicitud.save();

    res.json({
        documentacion_solicitud
    });

    
}

const documentacionSolicitudPut = async(req, res = response) => {

    const { id,tarea,nombre_documento ,contrato,estado,observacion} = req.body;

    const dataUpdate={
        _id:id,
        tarea:tarea,
        nombre_documento:nombre_documento,
        contrato:contrato,
        estado:estado,
        observacion:observacion
    }

    const documentacion_solicitud = await DocumentacionSolicitud.findByIdAndUpdate( id, dataUpdate );

    res.json(documentacion_solicitud);

}

const documentacionSolicitudPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}


module.exports = {
    documentacionSolicitudGet,
    documentacionSolicitudPost,
    documentacionSolicitudPut,
    documentacionSolicitudPatch,
}