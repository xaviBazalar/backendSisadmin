const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Schema } = require('mongoose');
const mongoose = require('mongoose');


const Contrato= require('../models/contrato')
const Gerencia = require('../models/gerencia')
const Usuario = require('../models/usuario')
const BitacoraSolicitud = require('../models/bitacora_solicitud')
const ContratoGerencia = require('../models/contratoGerencia')

const contratosGerenciaGet = async(req = request, res = response) => {

    const { gerencia,estado="" ,n_contrato="",n_gerencia="",page=1,options=1} = req.query;
    let query = {}   ;
    let query_filter = {}   ;
    
    if(gerencia===undefined){
        query = { };
    }else if(gerencia!=""){
        query = {"gerencia":mongoose.Types. ObjectId(gerencia)}   ;
    }

    if(estado!==undefined && estado!=""){
        query.estado=true
    }

    if(n_contrato!="" || n_gerencia!="" ){
        query={"contrato.contrato:":{$regex:`.*K,*`}} // Usar para dejar en 0 y poder filtrar
    }

    
    const optionsPag = {
        page: page,
        limit: 10,
        populate:[
            { path: "contrato",model:Contrato,populate: {path: 'adc',model: Usuario}},
            { path: "gerencia",model:Gerencia}
        ]
      };//match:{ name:query_filter},


    if(options==1){
        const [ total, contratos_gerencia ] = await Promise.all([
            ContratoGerencia.countDocuments(query),
            ContratoGerencia.paginate(query,optionsPag)
        ]);

        if(n_contrato!=""){
            let contratosGFilter=await filterContratosCG(n_contrato.replace("amp;","&"))
            contratos_gerencia.docs=contratosGFilter
        }
    
        if(n_gerencia!=""){
            let contratosGFilter=await filterGerenciaCG(n_gerencia)
            contratos_gerencia.docs=contratosGFilter
        }

        res.json({
            total,
            contratos_gerencia
        });
    }else{
        const [ total, contratos_gerencia ] = await Promise.all([
            ContratoGerencia.countDocuments(query),
            ContratoGerencia.find(query).
            populate( { path: "contrato",model:Contrato,populate: {path: 'adc',model: Usuario}}).
            populate( { path: "gerencia",model:Gerencia}).sort('contrato')
        ]);

        res.json({
            total,
            contratos_gerencia
        });
    }
    

    
}

let filterContratosCG=async(n_contrato)=>{
    let contratosTareaFilter=await ContratoGerencia.aggregate([
          
          
        { 
            "$lookup": {
              "from": "gerencia",
              "localField": "gerencia",
              "foreignField": "_id",
              "as": "gerencia"
            }
        },
        {
            $unwind: "$gerencia"
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

let filterGerenciaCG=async(n_gerencia)=>{
    let contratosTareaFilter=await ContratoGerencia.aggregate([
          
          
        { 
            "$lookup": {
              "from": "gerencia",
              "localField": "gerencia",
              "foreignField": "_id",
              "as": "gerencia"
            }
        },
        {
            $unwind: "$gerencia"
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
        }]).match({"gerencia.nombre_gerencia": { $regex: `.*${n_gerencia},*` }})

        return contratosTareaFilter
}

const contratosGerenciaPost = async(req, res = response) => {
    const { gerencia,contrato } = req.body;
    const contrato_gerencia= new ContratoGerencia({ gerencia,contrato });

    // Guardar en BD
    await contrato_gerencia.save();

    res.json({
        contrato_gerencia
    });
}

const contratosGerenciaPut = async(req, res = response) => {

    const { id,gerencia,contrato,estado} = req.body;
    
        const dataUpdate={
            _id:id,
            gerencia:gerencia,
            contrato:contrato,
            estado:estado
        }
    
        const contrato_gerencia = await ContratoGerencia.findByIdAndUpdate( id, dataUpdate );
    
        res.json(contrato_gerencia);
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