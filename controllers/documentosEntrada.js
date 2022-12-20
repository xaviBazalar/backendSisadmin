const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const DocumentoEntrada = require("../models/documentoEntrada");

const documentosEntradaGet = async(req = request, res = response) => {

    const { page=1,options=1,n_documento_entrada="" } = req.query;
    let query = {  };

    if(n_documento_entrada!=""){
        query.descripcion={$regex:`.*${n_documento_entrada},*`};//
    }

    const optionsPag = {
        page: page,
        limit: 10
    }

    if(options==1){
        const [ total, documentos_entrada ] = await Promise.all([
            DocumentoEntrada.countDocuments(query),
            DocumentoEntrada.paginate(query,optionsPag)
        ]);
    
     
        res.json({
            total,
            documentos_entrada
        });
    }else{
        const [ total, documentos_entrada ] = await Promise.all([
            DocumentoEntrada.countDocuments(query),
            DocumentoEntrada.find(query,optionsPag)
        ]);
    
     
        res.json({
            total,
            documentos_entrada
        });
    }

}

const documentosEntradaPost = async(req, res = response) => {

    const { tipo_documento,requerido,descripcion,url } = req.body;
    const documento_entrada = new DocumentoEntrada({ tipo_documento,requerido, descripcion,url });

    // Guardar en BD
    await documento_entrada.save();

    res.json({
        documento_entrada
    });

}

const documentosEntradaPut = async(req,res = response) => {
    //const { id } = req.params;
    const { id,tipo_documento,descripcion ,url,estado} = req.body;

    const dataUpdate={
        _id:id,
        tipo_documento:tipo_documento,
        descripcion:descripcion,
        url:url,
        estado:estado
    }

    const documento_entrada = await DocumentoEntrada.findByIdAndUpdate( id, dataUpdate );

    res.json(documento_entrada);
}



const documentosEntradaPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const documentosEntradaDel = async( req, res ) =>{
    const { id } = req.body;

    documento_entrada = await DocumentoEntrada.findByIdAndDelete(id)

    res.json({
        ok: true
    });  
}



module.exports = {
    documentosEntradaGet,
    documentosEntradaPost,
    documentosEntradaPut,
    documentosEntradaPatch,
    documentosEntradaDel
}