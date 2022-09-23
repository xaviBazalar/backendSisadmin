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

const documentosSalidaPost = async(req, res = response) => {

    const { tipo_documento,requerido,descripcion } = req.body;
    const documento_salida = new DocumentoSalida({ tipo_documento,requerido, descripcion });

    // Guardar en BD
    await documento_salida.save();

    res.json({
        documento_salida
    });

}

const documentosSalidaPut = async(req,res = response) => {
    //const { id } = req.params;
    const { id,tipo_documento,descripcion ,url,estado} = req.body;

    const dataUpdate={
        _id:id,
        tipo_documento:tipo_documento,
        descripcion:descripcion,
        url:url,
        estado:estado
    }

    const documento_salida = await DocumentoSalida.findByIdAndUpdate( id, dataUpdate );

    res.json(documento_salida);
}


const documentosSalidaPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}


module.exports = {
    documentosSalidaGet,
    documentosSalidaPost,
    documentosSalidaPut,
    documentosSalidaPatch,
}