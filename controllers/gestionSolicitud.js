const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Schema } = require('mongoose');
const mongoose = require('mongoose');


const Usuario = require('../models/usuario')
const DocumentacionSolicitud= require('../models/documentacionSolicitud')
const GestionSolicitud = require('../models/gestionSolicitud')
const BitacoraSolicitud = require('../models/bitacora_solicitud')
const Solicitud=require('../models/solicitud')
const Contrato=require('../models/contrato')
const NotificacionUsuario=require('../models/notificacionUsuario')

const gestionSolicitudGet = async(req = request, res = response) => {

    const { solicitud } = req.query;
    let query = {"solicitud":mongoose.Types. ObjectId(solicitud)}   ;
    
    if(solicitud===undefined){
        query = { };
    }
    

    const [ total, gestion_solicitud ] = await Promise.all([
        GestionSolicitud.countDocuments(query),
        GestionSolicitud.find(query).
        populate( { path: "documentacion_solicitud",model:DocumentacionSolicitud})
        //populate( { path: "documento_entrada",model:DocumentoEntrada })
    ]);

    res.json({
        total,
        gestion_solicitud
    });
}

const gestionSolicitudPost = async(req, res = response) => {
    const { solicitud,documentacion_solicitud,validado,estado,observacion,solicitante} = req.body;
    const gestionSolicitud = new GestionSolicitud({ solicitud, documentacion_solicitud,validado, estado, observacion});

    // Guardar en BD
    await gestionSolicitud.save();

    const usuario_ = await Usuario.findById(mongoose.Types. ObjectId(solicitante));

    let solicitud_=solicitud
    let evento=`Actualización Solicitud -  Ingreso Gestion Solicitud - ${usuario_.nombre}`
    const bitacoraSolicitud = new BitacoraSolicitud({solicitud_ ,evento });
    await bitacoraSolicitud.save();

    res.json({
        gestionSolicitud
    });
}

const gestionSolicitudPut = async(req, res = response) => {

    const { id } = req.params;
    const { validado,estado,observacion,solicitud,solicitante} = req.body;

    const dataUpdate={
        _id:id,
        validado:validado,
        estado:estado,
        observacion:observacion,
    }

    const gestionSolicitud = await GestionSolicitud.findByIdAndUpdate( id, dataUpdate );

    const usuario_ = await Usuario.findById(mongoose.Types. ObjectId(solicitante));


    let solicitud_=solicitud
    let evento=`Actualización Solicitud -  Update Gestion Solicitud - ${usuario_.nombre}`
    const bitacoraSolicitud = new BitacoraSolicitud({ solicitud_,evento });
    await bitacoraSolicitud.save();

    /** Notificacion */
    const solicitudA = await Solicitud.findById(solicitud);
 
    let queryContrato={"_id":mongoose.Types. ObjectId(solicitudA.contrato)}

    const [ contratos ] = await Promise.all([
        Contrato.find(queryContrato).
        populate({ path: "adc",model:Usuario})
    ]);

    let usuario=contratos[0].adc._id
    let tipo="Actualizacion Gestion Solicitud"
    let link="/solicitud/"+solicitud_
    const notificacioUsuarioB= new NotificacionUsuario({usuario,tipo,link})
    await notificacioUsuarioB.save();
    /*Fin Notificacion*/
    
    res.json(gestionSolicitud);

}

const gestionSolicitudPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}


module.exports = {
    gestionSolicitudGet,
    gestionSolicitudPost,
    gestionSolicitudPut,
    gestionSolicitudPatch,
}