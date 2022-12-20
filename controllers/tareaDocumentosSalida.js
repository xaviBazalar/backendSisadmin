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

    const { tarea,contrato ,page=1,options=1,n_contrato="",n_tarea=""} = req.query;
    let query = {}   ;
    
    if(tarea===undefined){
        query = { };
    }else if(tarea!=""){
        query = {"tarea":mongoose.Types. ObjectId(tarea),"contrato":mongoose.Types. ObjectId(contrato)}   ;
    }

    if(n_contrato!="" || n_tarea!=""){
        query={"contrato.contrato:":{$regex:`.*K,*`}} // Usar para dejar en 0 y poder filtrar
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

        if(n_contrato!=""){
            let contratosTareaDSFilter=await filterContratosInDSTareaContratos(n_contrato.replace("amp;","&"))
            tarea_documentos_salida.docs=contratosTareaDSFilter
        }
    
        if(n_tarea!=""){
            let contratosTareaDSFilter=await filterTareasInDSTareaContratos(n_tarea)
            tarea_documentos_salida.docs=contratosTareaDSFilter
        }
    
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


let filterContratosInDSTareaContratos=async(n_contrato)=>{
    let contratosTareaFilter=await TareaDocumentosSalida.aggregate([
          
          
        { 
            "$lookup": {
              "from": "tareas",
              "localField": "tarea",
              "foreignField": "_id",
              "as": "tarea"
            }
        },
        {
            $unwind: "$tarea"
        },
        {
            
            "$lookup": {
                "from": "documentos_salida",
                "localField": "documento_salida",
                "foreignField": "_id",
                "as": "documento_salida"
              }
        },
        {
            $unwind: "$documento_salida"
        },
        {
            
            "$lookup": {
                "from": "contratos",
                "localField": "contrato",
                "foreignField": "_id",
                "as": "contrato"
              }
        },
        {
            $unwind: "$contrato"
        }]).match({"contrato.contrato": { $regex: `.*${n_contrato},*` }})

        return contratosTareaFilter
}

let filterTareasInDSTareaContratos=async(n_tarea)=>{
    let contratosTareaFilter=await TareaDocumentosSalida.aggregate([
          
          
        { 
            "$lookup": {
              "from": "tareas",
              "localField": "tarea",
              "foreignField": "_id",
              "as": "tarea"
            }
        },
        {
            $unwind: "$tarea"
        },
        {
            
            "$lookup": {
                "from": "documentos_salida",
                "localField": "documento_salida",
                "foreignField": "_id",
                "as": "documento_salida"
              }
        },
        {
            $unwind: "$documento_salida"
        },
        {
            
            "$lookup": {
                "from": "contratos",
                "localField": "contrato",
                "foreignField": "_id",
                "as": "contrato"
              }
        },
        {
            $unwind: "$contrato"
        }]).match({"tarea.nombre_tarea": { $regex: `.*${n_tarea},*` }})

        return contratosTareaFilter
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



    const tareaDocumentoSalida = await TareaDocumentosSalida.findByIdAndUpdate( id, dataUpdate );

    res.json(tareaDocumentoSalida);
}

const tareaDocumentosSalidaPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const tareaDocumentosSalidaDel = async( req, res ) =>{
    const { id } = req.body;

    tareaDocumentoSalida = await TareaDocumentosSalida.findByIdAndDelete(id)

    res.json({
        ok: true
    });  
}

module.exports = {
    tareaDocumentosSalidaGet,
    tareaDocumentosSalidaPost,
    tareaDocumentosSalidaPut,
    tareaDocumentosSalidaPatch,
    tareaDocumentosSalidaDel
}