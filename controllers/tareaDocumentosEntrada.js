const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Schema } = require('mongoose');
const mongoose = require('mongoose');


const HistorialResultadoSolicitud = require("../models/historialResultadoSolicitud")
const DocumentoEntrada = require('../models/documentoEntrada');
const Tarea= require('../models/tarea')
const Contrato= require('../models/contrato')
const TareaDocumentosEntrada = require('../models/tareaDocumentoEntrada')

const tareaDocumentosEntradaGet = async(req = request, res = response) => {

    const { tarea,contrato,page=1,options=1  } = req.query;
    let query = {}  ;
    
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
            { path: "documento_entrada",model:DocumentoEntrada},
            { path: "contrato",model:Contrato}
        ]
      };

    if(options==1){
        const [ total, tarea_documentos_entrada ] = await Promise.all([
            TareaDocumentosEntrada.countDocuments(query),
            TareaDocumentosEntrada.paginate(query,optionsPag)
        ]);
    
        res.json({
            total,
            tarea_documentos_entrada
        });
    }else{
        const [ total, tarea_documentos_entrada ] = await Promise.all([
            TareaDocumentosEntrada.countDocuments(query),
            TareaDocumentosEntrada.find(query).
            populate( { path: "tarea",model:Tarea}).
            populate( { path: "documento_entrada",model:DocumentoEntrada }).
            populate( { path: "contrato",model:Contrato }).sort('contrato')
        ]);
    
        res.json({
            total,
            tarea_documentos_entrada
        });
    }

    
}

const tareaDocumentosEntradaPost = async(req, res = response) => {

    const { tarea,documento_entrada,contrato } = req.body;
    const tarea_documentos_entrada = new TareaDocumentosEntrada({ tarea,documento_entrada, contrato });

    // Guardar en BD
    await tarea_documentos_entrada.save();

    res.json({
        tarea_documentos_entrada
    });

}

const tareaDocumentosEntradaPut = async(req, res = response) => {

   
   /* const { id } = req.params;

    const { validado, url_ref, observacion } = req.body;

    const dataUpdate={
        _id:id,
        validado:validado,
        url_ref:url_ref,
        observacion:observacion
    }


    const tareaDocumentoEntrada = await TareaDocumentosEntrada.findByIdAndUpdate( id, dataUpdate );

    res.json(tareaDocumentoEntrada);*/
   // const { id } = req.params;

    const { id,tarea, documento_entrada, contrato,estado } = req.body;

    const dataUpdate={
        _id:id,
        tarea:tarea,
        documento_entrada:documento_entrada,
        contrato:contrato,
        estado:estado
    }


    const tareaDocumentoEntrada = await TareaDocumentosEntrada.findByIdAndUpdate( id, dataUpdate );

    res.json(tareaDocumentoEntrada);
}

const tareaDocumentosEntradaPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}


module.exports = {
    tareaDocumentosEntradaGet,
    tareaDocumentosEntradaPost,
    tareaDocumentosEntradaPut,
    tareaDocumentosEntradaPatch,
}