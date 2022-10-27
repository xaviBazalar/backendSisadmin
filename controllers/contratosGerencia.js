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

    const { gerencia,estado="" ,n_contrato="",page=1,options=1} = req.query;
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