const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const DocumentoSalida = require("../models/documentoSalida");

const documentosSalidaGet = async(req = request, res = response) => {

    //const { id } = req.query;
    let query = {  };

    const [ total, documentos_salida ] = await Promise.all([
        DocumentoSalida.countDocuments(query),
        DocumentoSalida.find(query)
    ]);

 
    res.json({
        total,
        documentos_salida
    });
}



const documentosSalidaPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}


module.exports = {
    documentosSalidaGet,
    documentosSalidaPatch,
}