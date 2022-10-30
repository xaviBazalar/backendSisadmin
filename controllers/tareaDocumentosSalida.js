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

    const { tarea,contrato ,page=1,options=1} = req.query;
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
            { path: "documento_salida",model:DocumentoSalida},
            { path: "contrato",model:Contrato}
        ]
      };

    if(options==1){
        const [ total, tarea_documentos_salida ] = await Promise.all([
            TareaDocumentosSalida.countDocuments(query),
            TareaDocumentosSalida.paginate(query,optionsPag)
        ]);
    
        res.json({
            total,
            tarea_documentos_salida
        });
    }else{
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
    
    
}

const tareaDocumentosSalidaPost = async(req, res = response) => {

    const { tarea,documento_salida,contrato } = req.body;
    const tarea_documentos_salida = new TareaDocumentosSalida({ tarea,documento_salida, contrato });

    // Guardar en BD
    await tarea_documentos_salida.save();

    res.json({
        tarea_documentos_salida
    });
}

const tareaDocumentosSalidaPut = async(req, res = response) => {

    //const { id } = req.params;

    const { id,tarea, documento_salida, contrato,estado } = req.body;

    const dataUpdate={
        _id:id,
        tarea:tarea,
        documento_salida:documento_salida,
        contrato:contrato,
        estado:estado
    }

    console.log(dataUpdate)


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