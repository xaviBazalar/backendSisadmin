const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const AvisoExtra = require('../models/avisoExtra');



const avisoExtraGet = async(req = request, res = response) => {

    //const { limite = 8, desde = 0, estado="",page=1,options=1,n_gerencia="" } = req.query;
    //const query = {  };//estado: true
    let avisos_extra=await AvisoExtra.aggregate([
        { "$group": {
            "_id": {
                "email": "$email"
            },
            "total": { "$sum": 1 }
        }}
    ])


    res.json({
            avisos_extra
    });
        
}

const avisoExtraPost = async(req, res = response) => {

    const { nombre,email,contrato } = req.body;
    const aviso_extra = new AvisoExtra({ nombre, email,contrato });

    // Guardar en BD
    await aviso_extra.save();

    res.json({
        aviso_extra
    });

}

const avisoExtraPut = async(req,res = response) => {
    //const { id } = req.params;
    const { email_old,email_new} = req.body;

    const aviso_extra = await AvisoExtra.updateMany( {"email": email_old}, {"$set":{"email": email_new}} );

    res.json(aviso_extra);
}


const avisoExtraPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - avisoExtraPatch'
    });
}




module.exports = {
    avisoExtraGet,
    avisoExtraPost,
    avisoExtraPut,
    avisoExtraPatch

}