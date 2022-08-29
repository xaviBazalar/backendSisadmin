const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');

const Solicitud = require('../models/solicitud');
const Gerencia = require('../models/gerencia');
const Contrato = require('../models/contrato');
const Tarea = require('../models/tarea');
const Usuario = require('../models/usuario');
const EstadoSolicitud = require('../models/estadoSolicitud.js');
const EstadoResultado= require('../models/estadoResultado')

const solicitudesUsuarioGet = async(req = request, res = response) => {

    const { gst } = req.query;
    let query = { gst:mongoose.Types. ObjectId(gst) };

    if(gst===undefined){
        query = { };
    }

    const [ total, solicitudes ] = await Promise.all([
        Solicitud.countDocuments(query),
        Solicitud.find(query).
        populate( { path: "gerencia",model:Gerencia}).
        populate( { path: "contrato",model:Contrato}).
        populate( { path: "tarea",model:Tarea}).
        populate( { path: "estado_solicitud",model:EstadoSolicitud}).
        populate( { path: "gst",model:Usuario}).
        populate( { path: "bko",model:Usuario}).
        populate( { path: "estado_resultado",model:EstadoResultado})
    ]);

    

    res.json({
        total,
        solicitudes
    });
}


const solicitudesUsuarioPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}


module.exports = {
    solicitudesUsuarioGet,
    solicitudesUsuarioPatch,
}