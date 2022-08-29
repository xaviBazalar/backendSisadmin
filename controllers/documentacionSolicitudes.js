const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Schema } = require('mongoose');
const mongoose = require('mongoose');



const Tarea= require('../models/tarea')
const DocumentacionSolicitud = require('../models/documentacionSolicitud')

const documentacionSolicitudGet = async(req = request, res = response) => {

    const { tarea } = req.query;
    let query = {"tarea":mongoose.Types. ObjectId(tarea)}   ;
    
    if(tarea===undefined){
        query = { };
    }
    

    const [ total, documentacion_solicitudes ] = await Promise.all([
        DocumentacionSolicitud.countDocuments(query),
        DocumentacionSolicitud.find(query).
        populate( { path: "tarea",model:Tarea})
        //populate( { path: "documento_entrada",model:DocumentoEntrada })
    ]);

    res.json({
        total,
        documentacion_solicitudes
    });
}

const documentacionSolicitudPost = async(req, res = response) => {


}

const documentacionSolicitudPut = async(req, res = response) => {

    const { id } = req.params;

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