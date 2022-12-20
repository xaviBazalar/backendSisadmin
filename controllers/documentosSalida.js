const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const DocumentoSalida = require("../models/documentoSalida");

const documentosSalidaGet = async(req = request, res = response) => {

    const { page=1,options=1,n_documento_salida="" } = req.query;
    let query = {  };

    if(n_documento_salida!=""){
        query.descripcion={$regex:`.*${n_documento_salida},*`};//
    }

    const optionsPag = {
        page: page,
        limit: 10
    }

    if(options==1){
        const [ total, documentos_salida ] = await Promise.all([
            DocumentoSalida.countDocuments(query),
            DocumentoSalida.paginate(query,optionsPag)
        ]);

        res.json({
            total,
            documentos_salida
        });
    }else{
        const [ total, documentos_salida ] = await Promise.all([
            DocumentoSalida.countDocuments(query),
            DocumentoSalida.find(query)
        ]);

        res.json({
            total,
            documentos_salida
        });
    }
 
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

const documentosSalidaDel = async( req, res ) =>{
    const { id } = req.body;

    documento_salida = await DocumentoSalida.findByIdAndDelete(id)

    res.json({
        ok: true
    });  
}

module.exports = {
    documentosSalidaGet,
    documentosSalidaPost,
    documentosSalidaPut,
    documentosSalidaPatch,
    documentosSalidaDel
}