const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Contrato = require('../models/contrato');
const Tarea = require('../models/tarea');
const TareaContrato = require('../models/tareaContrato');
const Usuario = require('../models/usuario')

const tareasContratoGet = async(req = request, res = response) => {
 
    const {contrato,n_contrato="",n_tarea="",page=1} = req.query;

    let query = { contrato:contrato};

    if(contrato=="" ){
        query = {}
    }else{
        query.estado=true
    }

    if(n_contrato!="" || n_tarea!=""){
        query={"contrato.contrato:":{$regex:`.*K,*`}} // Usar para dejar en 0 y poder filtrar
    }
    

    const options = {
        page: page,
        limit: 10,
        populate:[
            { path: "tarea",model:Tarea},
            { path: "contrato",model:Contrato},
            { path: "gst",model:Usuario},
            { path: "bko",model:Usuario}
        ]
      };
    

    let [ total, contratos ] = await Promise.all([
        TareaContrato.countDocuments(query),
        TareaContrato.paginate(query,options)
    ]);

    /*
    
            $match: {
              "contrato.contrato": { $regex: `.*K,*` }
            }
          },
    */
    if(n_contrato!=""){
        let contratosTareaFilter=await filterContratosInTareaContratos(n_contrato)
        contratos.docs=contratosTareaFilter
    }

    if(n_tarea!=""){
        let contratosTareaFilter=await filterTareasInTareaContratos(n_tarea)
        contratos.docs=contratosTareaFilter
    }
    
    res.json({
        total,
        contratos
    });

}

let filterContratosInTareaContratos=async(n_contrato)=>{
    let contratosTareaFilter=await TareaContrato.aggregate([
          
          
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
        },
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
                "from": "usuarios",
                "localField": "gst",
                "foreignField": "_id",
                "as": "gst"
              }
        },
        {
            $unwind: "$gst"
        },
        {
            
            "$lookup": {
                "from": "usuarios",
                "localField": "bko",
                "foreignField": "_id",
                "as": "bko"
              }
        },
        {
            $unwind: "$bko"
        }
        ]).match({"contrato.contrato": { $regex: `.*${n_contrato},*` }})

        return contratosTareaFilter
}

let filterTareasInTareaContratos=async(n_tarea)=>{
    let contratosTareaFilter=await TareaContrato.aggregate([
          
          
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
        },
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
                "from": "usuarios",
                "localField": "gst",
                "foreignField": "_id",
                "as": "gst"
              }
        },
        {
            $unwind: "$gst"
        },
        {
            
            "$lookup": {
                "from": "usuarios",
                "localField": "bko",
                "foreignField": "_id",
                "as": "bko"
              }
        },
        {
            $unwind: "$bko"
        }]).match({"tarea.nombre_tarea": { $regex: `.*${n_tarea},*` }})

        return contratosTareaFilter
}

const tareasContratoPost = async(req, res = response) => {

    const { tarea,  contrato,gst,bko} = req.body;
    const tarea_contrato = new TareaContrato({ tarea, contrato,gst,bko });

    // Guardar en BD
    await tarea_contrato.save();

    res.json({
        tarea_contrato
    });
}

const tareasContratoPut = async(req,res = response) => {
    //const { id } = req.params;
    const { id,tarea,contrato,gst ,bko,estado} = req.body;

    const dataUpdate={
        _id:id,
        tarea:tarea,
        contrato:contrato,
        gst:gst,
        bko:bko,
        estado:estado
    }


    const tareaContrato = await TareaContrato.findByIdAndUpdate( id, dataUpdate );

    res.json(tareaContrato);
}

const tareasContratoPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}



module.exports = {
    tareasContratoGet,
    tareasContratoPost,
    tareasContratoPut,
    tareasContratoPatch,
}