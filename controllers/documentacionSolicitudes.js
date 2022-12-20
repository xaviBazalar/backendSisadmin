const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Schema } = require('mongoose');
const mongoose = require('mongoose');



const Tarea= require('../models/tarea')
const Contrato= require('../models/contrato')
const DocumentacionSolicitud = require('../models/documentacionSolicitud')

const documentacionSolicitudGet = async(req = request, res = response) => {

    const { tarea,contrato,page=1,n_contrato="",n_tarea="",n_gestion="" } = req.query;
    let query = {}   ;
    
    if(tarea===undefined){
        query = { };
    }else if(tarea!=""){
        query = {"tarea":mongoose.Types. ObjectId(tarea),"contrato":mongoose.Types. ObjectId(contrato)}   ;
    }
    
    if(n_contrato!="" || n_tarea!="" ){
        query={"contrato.contrato:":{$regex:`.*K,*`}} // Usar para dejar en 0 y poder filtrar
    }

    if(n_gestion!=""){
        query.nombre_documento={$regex:`.*${n_gestion},*`};
    }

    const optionsPag = {
        page: page,
        limit: 10,
        populate:[
            { path: "tarea",model:Tarea},
            { path: "contrato",model:Contrato}
        ]
      };

    const [ total, documentacion_solicitudes ] = await Promise.all([
        DocumentacionSolicitud.countDocuments(query),
        DocumentacionSolicitud.paginate(query,optionsPag)
    ]);

    if(n_contrato!=""){
        let contratosTareaDEFilter=await filterContratosDG(n_contrato.replace("amp;","&"))
        documentacion_solicitudes.docs=contratosTareaDEFilter
    }

    if(n_tarea!=""){
        let contratosTareaDEFilter=await filterTareasDG(n_tarea)
        documentacion_solicitudes.docs=contratosTareaDEFilter
    }

    res.json({
        total,
        documentacion_solicitudes
    });
}

let filterContratosDG=async(n_contrato)=>{
    let contratosTareaFilter=await DocumentacionSolicitud.aggregate([
          
          
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

let filterTareasDG=async(n_tarea)=>{
    let contratosTareaFilter=await DocumentacionSolicitud.aggregate([
          
          
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

const documentacionSolicitudDel = async( req, res ) =>{
    const { id } = req.body;

    documentacion_solicitud = await DocumentacionSolicitud.findByIdAndDelete(id)

    res.json({
        ok: true
    });  
}


module.exports = {
    documentacionSolicitudGet,
    documentacionSolicitudPost,
    documentacionSolicitudPut,
    documentacionSolicitudPatch,
    documentacionSolicitudDel
}