const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const Tarea= require('../models/tarea')
const TareaDocumentoSalida= require('../models/tareaDocumentoSalida')
const TareaDocumentosSalidaSolicitud = require('../models/tareaDocumentoSalidaSolicitud')
const Solicitud=require('../models/solicitud')
const Contrato=require('../models/contrato')
const NotificacionUsuario=require('../models/notificacionUsuario')
const Usuario=require('../models/usuario')

const tareaDocumentosSalidaSolicitudGet = async(req = request, res = response) => {

    const { randomId } = req.query;
    let query = { };
    if(randomId!==undefined){
        query = {"randomId":randomId}
    }
    //let query = {"tarea_documento":mongoose.Types. ObjectId(tarea_documento)}   ;
    
    /*if(tarea_documento===undefined){
        query = { };
    }*/
    

    const [ total, tarea_documentos_salida_solicitud ] = await Promise.all([
        TareaDocumentosSalidaSolicitud.countDocuments(query),
        TareaDocumentosSalidaSolicitud.find(query).
        populate( { path: "tarea_documento",model:TareaDocumentoSalida})
    ]);

    res.json({
        total,
        tarea_documentos_salida_solicitud
    });
}

const tareaDocumentosSalidaSolicitudPost = async(req, res = response) => {

    
    const { tarea_documento, randomId, validado, url_ref,observacion} = req.body;
    const tareaDocumentoSalidaSolicitud = new TareaDocumentosSalidaSolicitud({ tarea_documento, randomId, validado, url_ref ,observacion });

    /** Notificacion */
    const solicitudA = await Solicitud.find({randomId:randomId});
    
    let queryContrato={"_id":mongoose.Types. ObjectId(solicitudA[0].contrato._id)}

    const [ contratos ] = await Promise.all([
        Contrato.find(queryContrato).
        populate({ path: "adc",model:Usuario})
    ]);

    let usuario=contratos[0].adc._id
    let tipo="Actualizacion Subidad Documento Resultado"
    let link="/solicitud/"+solicitudA[0]._id
    const notificacioUsuarioB= new NotificacionUsuario({usuario,tipo,link})
    await notificacioUsuarioB.save();
    /*Fin Notificacion*/

    // Guardar en BD
    await tareaDocumentoSalidaSolicitud.save();


    res.json({
        tareaDocumentoSalidaSolicitud
    });
}

const tareaDocumentosSalidaSolicitudPut = async(req, res = response) => {

    const { id } = req.params;

    const { validado, url_ref, observacion } = req.body;

    const dataUpdate={
        _id:id,
        validado:validado,
        url_ref:url_ref,
        observacion:observacion
    }


    const tareaDocumentoSalida = await TareaDocumentoSalida.findByIdAndUpdate( id, dataUpdate );

    res.json(tareaDocumentoSalida);
}

const tareaDocumentosSalidaSolicitudPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}


module.exports = {
    tareaDocumentosSalidaSolicitudGet,
    tareaDocumentosSalidaSolicitudPost,
    tareaDocumentosSalidaSolicitudPut,
    tareaDocumentosSalidaSolicitudPatch,
}