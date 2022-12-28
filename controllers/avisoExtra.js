const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const AvisoExtra = require('../models/avisoExtra');
const Contrato= require('../models/contrato')


const avisoExtraGet = async(req = request, res = response) => {

    const { email="" } = req.query;
    let query = {  };//estado: true
    let avisos_extra
    if(email!=""){
        
        query.email=email
        
        const [ avisos_extra ] = await Promise.all([
            AvisoExtra.find(query).
            populate( { path: "contrato",model:Contrato})
        ]);

        res.json({
            avisos_extra
        });
    
    }else{
        avisos_extra=await AvisoExtra.aggregate([
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

    


   
        
}

const avisoExtraPost = async(req, res = response) => {

    const { nombre,email,contrato } = req.body;
    try {
        const aviso_extra = new AvisoExtra({ nombre, email,contrato });
        // Guardar en BD
        await aviso_extra.save();

        res.json({
            error:false,
            msg:"",
            aviso_extra
        });
    } catch (error) {
       
        res.json({
            error:true,
            msg:"No se pudo registrar , recordar que no se puede duplicar el correo con un contrato ya existente",
            aviso_extra:[]
        });
    }
    


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