const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Schema } = require('mongoose');
const mongoose = require('mongoose');



const BitacoraSolicitud= require('../models/bitacora_solicitud')

const bitacoraSolicitudGet = async(req = request, res = response) => {

    const { solicitud } = req.query;
    let query = {"solicitud_":mongoose.Types. ObjectId(solicitud)}   ;
    
    if(solicitud===undefined){
        query = { };
    }
    const [ total, bitacora_solicitud ] = await Promise.all([
        BitacoraSolicitud.countDocuments(query),
        BitacoraSolicitud.find(query)
       // populate( { path: "tarea",model:Tarea}).
        //populate( { path: "documento_entrada",model:DocumentoEntrada })
    ]);

    res.json({
        total,
        bitacora_solicitud
    });
}

const bitacoraSolicitudPost = async(req, res = response) => {


}

const bitacoraSolicitudPut = async(req, res = response) => {

    const { id } = req.params;

}

const bitacoraSolicitudPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}


module.exports = {
    bitacoraSolicitudGet,
    bitacoraSolicitudPost,
    bitacoraSolicitudPut,
    bitacoraSolicitudPatch,
}