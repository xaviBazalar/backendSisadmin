const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Schema } = require('mongoose');
const mongoose = require('mongoose');


const Contrato= require('../models/contrato')
const Gerencia = require('../models/gerencia')
const BitacoraSolicitud = require('../models/bitacora_solicitud')
const ContratoGerencia = require('../models/contratoGerencia')

const contratosGerenciaGet = async(req = request, res = response) => {

    const { gerencia } = req.query;
    let query = {"gerencia":mongoose.Types. ObjectId(gerencia)}   ;
    
    if(gerencia===undefined){
        query = { };
    }
    

    const [ total, contratos_gerencia ] = await Promise.all([
        ContratoGerencia.countDocuments(query),
        ContratoGerencia.find(query).
        populate( { path: "contrato",model:Contrato}).
        populate( { path: "gerencia",model:Gerencia})
        //populate( { path: "documento_entrada",model:DocumentoEntrada })
    ]);

    res.json({
        total,
        contratos_gerencia
    });
}

const contratosGerenciaPost = async(req, res = response) => {
    /*const { solicitud,documentacion_solicitud,validado,estado,observacion,solicitante} = req.body;
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
    });*/
}

const contratosGerenciaPut = async(req, res = response) => {

    /*const { id } = req.params;
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

    res.json(gestionSolicitud);
    */
}

const contratosGerenciaPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}


module.exports = {
    contratosGerenciaGet,
    contratosGerenciaPost,
    contratosGerenciaPut,
    contratosGerenciaPatch,
}