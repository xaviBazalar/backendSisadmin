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

const documentosEntradaPost = async(req, res = response) => {

    const { tipo_documento,requerido,descripcion } = req.body;
    const documento_entrada = new DocumentoEntrada({ tipo_documento,requerido, descripcion });

    // Guardar en BD
    await documento_entrada.save();

    res.json({
        documento_entrada
    });

}


const documentosEntradaPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}


module.exports = {
    documentosEntradaGet,
    documentosEntradaPost,
    documentosEntradaPatch,
}