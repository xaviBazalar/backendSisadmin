const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');

/**
 *  gerencia: { type: Schema.ObjectId, ref: "gerencia" },
    contrato: { type: Schema.ObjectId, ref: "contrato" },
    tarea: { type: Schema.ObjectId, ref: "tarea" },
    gst: { type: Schema.ObjectId, ref: "gst" },
    bko: { type: Schema.ObjectId, ref: "bko" },
    estado_solicitud : { type: Schema.ObjectId, ref: "bko" }
 */
const Solicitud = require('../models/solicitud');
const Gerencia = require('../models/gerencia');
const Contrato = require('../models/contrato');
const Tarea = require('../models/tarea');
const Usuario = require('../models/usuario');
const EstadoSolicitud = require('../models/estadoSolicitud.js');
const EstadoResultado= require('../models/estadoResultado')
const BitacoraSolicitud= require('../models/bitacora_solicitud')
const NotificacionUsuario= require('../models/notificacionUsuario')

const solicitudesGet = async(req = request, res = response) => {
    
    const { id , gerencia, tarea, perfil,estado_solicitud,estado_resultado} = req.query;
    let query = { _id:id };
    if(id===undefined){
        query = { };
    }


    if(id===undefined & gerencia!=""){
        query.gerencia=gerencia
    }

    if(id===undefined & tarea!=""){
        query.tarea=tarea
    }

    if(id===undefined & perfil!=""){
        query.gst=mongoose.Types. ObjectId(perfil)
    
        /*if(perfil=="62fb0fae57ae2b6d49ac5b88"){
            query.gst=mongoose.Types. ObjectId(perfil)
        }


        if(perfil=="62fb0fb757ae2b6d49ac5b89"){
            query.bko=mongoose.Types. ObjectId(perfil)
        }*/
        
    }

    if(id===undefined & estado_solicitud!=""){
        query.estado_solicitud=estado_solicitud
    }

    if(id===undefined & estado_resultado!=""){
        query.estado_resultado=estado_resultado
    }

    console.log(query)

    
        Solicitud.find(query, function (err, solicitudes) {
            Gerencia.populate(solicitudes, { path: "gerencia" }, function (err, solicitudes) {
                Contrato.populate(solicitudes, { path: "contrato" }, function (err, solicitudes) {
                    Tarea.populate(solicitudes, { path: "tarea" }, function (err, solicitudes) {
                        EstadoSolicitud.populate(solicitudes, { path: "estado_solicitud" }, function (err, solicitudes) {
                            Usuario.populate(solicitudes, { path: "gst" }, function (err, solicitudes) {
                                Usuario.populate(solicitudes, { path: "bko" }, function (err, solicitudes) {
                                    EstadoResultado.populate(solicitudes, { path: "estado_resultado" }, function (err, solicitudes) {
                                        res.json({
                                            solicitudes,
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    

    /*res.json({
        total,
        solicitudes
    });*/
}

const getFecEntrega=()=>{
    hoy = new Date();
    i=0;
    while (i<7) { // 7 días habiles
        hoy.setTime(hoy.getTime()+24*60*60*1000); // añadimos 1 día
        if (hoy.getDay() != 6 && hoy.getDay() != 0)
            i++;  
    }
    fecha = hoy.getDate()+ '/' + ((hoy.getMonth())+1) + '/' + hoy.getFullYear();
    let mes=((hoy.getMonth())+1);
    mes=(mes.toString().length==1)?"0"+mes:mes;
    let dia=hoy.getDate();
    dia=(dia.toString().length==1)?"0"+dia:dia;
    return hoy.getFullYear()+"-"+mes+"-"+dia
}

const solicitudesPost = async(req, res = response) => {

    const [ solicitudes ] = await Promise.all([
        Solicitud.find().limit(1).sort({$natural:-1})
    ]);

    
    let fecha_entrega=getFecEntrega();

    let idsecuencia=(solicitudes.length==0)?1:solicitudes[0].idsecuencia+1

    const { gerencia, contrato, tarea, gst ,bko,estado_solicitud,estado_resultado,observacion,fecha_solicitud,fecha_inicio,randomId} = req.body;
    const solicitud = new Solicitud({ gerencia, contrato, tarea, gst ,bko,estado_solicitud,estado_resultado,observacion,fecha_solicitud,fecha_inicio,fecha_entrega,idsecuencia,randomId });

    // Guardar en BD
    await solicitud.save();

    let solicitud_=solicitud._id
    let evento="Nueva Solicitud -  En proceso"
    const bitacoraSolicitud = new BitacoraSolicitud({ solicitud_,evento });
    await bitacoraSolicitud.save();

    let usuario=gst
    let tipo="Solicitud"
    let link="/solicitud/"+solicitud_
    const notificacioUsuario= new NotificacionUsuario({usuario,tipo,link})
    await notificacioUsuario.save();

    res.json({
        solicitud
    });
}


const solicitudesPut = async(req, res = response) => {

    const { id } = req.params;

    const { estado_solicitud, fecha_inicio, fecha_solicitud, gst, bko,estado_resultado } = req.body;
    let dataUpdate;
    let evento;
    if(estado_resultado===undefined){
        dataUpdate={
            _id:id,
            estado_solicitud:estado_solicitud,
            fecha_inicio:fecha_inicio,
            fecha_solicitud:fecha_solicitud,
            gst:gst,
            bko:bko
        } 
        evento="Actualización Solicitud - Estado Solicitud"
    }else{
        dataUpdate={
            _id:id,
            estado_resultado:estado_resultado,
        } 
        evento="Actualización Solicitud - Estado Resultado"
    }

    const solicitud = await Solicitud.findByIdAndUpdate( id, dataUpdate );

    let solicitud_=id
    
    const bitacoraSolicitud = new BitacoraSolicitud({ solicitud_,evento });
    await bitacoraSolicitud.save();

    res.json(solicitud);
}

const solicitudesPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}





module.exports = {
    solicitudesGet,
    solicitudesPost,
    solicitudesPut,
    solicitudesPatch,
}