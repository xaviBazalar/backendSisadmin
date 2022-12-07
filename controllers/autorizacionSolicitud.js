const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');

const AutorizacionSolicitud= require('../models/autorizacionSolicitud')
const Solicitud= require('../models/solicitud')
const Usuario=require('../models/usuario')

const autorizacionSolicitudGet = async(req = request, res = response) => {
    const { pin="",usuario_="",solicitud="" } = req.query;

    if(solicitud==""){
        let query={
            pin:pin,
            _id:mongoose.Types. ObjectId(usuario_)
        }
        let usuario= await Usuario.countDocuments(query)
    
        res.json({total:usuario});
    }else{
        let query={
            solicitud:mongoose.Types. ObjectId(solicitud)
        }
        const [ total, autorizacion_solicitud ] = await Promise.all([
            AutorizacionSolicitud.countDocuments(query),
            AutorizacionSolicitud.find(query).
            populate( { path: "usuario",model:Usuario}).
            populate( { path: "solicitud",model:Solicitud}) 
        ]);
    
        res.json({
            total,
            autorizacion_solicitud
        });
    }
    
}

const autorizacionSolicitudPut = async(req, res = response) => {


    const { solicitud, usuario,autorizado} = req.body;

    dataUpdate={
        usuario:usuario,
        solicitud:solicitud,
        autorizado:autorizado,
        fecha_autorizacion:getDateNow(),
        hora_autorizacion:getTime()
    } 

    let query={
        solicitud:mongoose.Types. ObjectId(solicitud),
        usuario:mongoose.Types. ObjectId(usuario)
    }

    let queryValidacion={
        solicitud:mongoose.Types. ObjectId(solicitud),
        autorizado:false
    }

    let autorizacionSolicitud= await AutorizacionSolicitud.find(query)

    const autorizacionSolicitud_ = await AutorizacionSolicitud.findByIdAndUpdate( autorizacionSolicitud[0]._id, dataUpdate );

    let autorizacionSolicitudVal = await AutorizacionSolicitud.countDocuments(queryValidacion)
    if(autorizacionSolicitudVal==0){
        let dataUpdateSolicitud={
            autorizacion_terminada:true,
            fecha_autorizacion_terminada:getDateNow(),
            hora_autorizacion_terminada:getTime()
        }
        const solicitud_ = await Solicitud.findByIdAndUpdate( solicitud, dataUpdateSolicitud );
        console.log(solicitud_)
    }

    res.json(autorizacionSolicitud_);
}
const getTime = ()=>{
    const d = new Date();
    const dd = [d.getHours(), d.getMinutes(), d.getSeconds()].map((a)=>(a < 10 ? '0' + a : a));
    return dd.join(':');
};

const getDateNow=()=>{
    let hoy= new Date();
   
    let mes=((hoy.getMonth())+1);
    mes=(mes.toString().length==1)?"0"+mes:mes;
    let dia=hoy.getDate();
    dia=(dia.toString().length==1)?"0"+dia:dia;

    let hoyWithFormat=hoy.getFullYear()+"-"+mes+"-"+dia

    return hoyWithFormat;
}



module.exports = {
    autorizacionSolicitudPut,
    autorizacionSolicitudGet
}