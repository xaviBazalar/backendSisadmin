const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const DocumentoEntrada = require("../models/documentoEntrada");

const documentosEntradaGet = async(req = request, res = response) => {

    //const { id } = req.query;
    let query = {  };

    const [ total, documentos_entrada ] = await Promise.all([
        DocumentoEntrada.countDocuments(query),
        DocumentoEntrada.find(query)
    ]);

 
    res.json({
        total,
        documentos_entrada
    });
}



const documentosEntradaPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}


module.exports = {
    documentosEntradaGet,
    documentosEntradaPatch,
}