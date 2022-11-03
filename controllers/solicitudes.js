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
    
    const { 
        id , 
        gerencia, 
        tarea, 
        perfil,
        estado_solicitud,
        estado_resultado,
        ingresado,
        solicitante,
        gst,
        bko,
        fecha_solicitud,
        fecha_inicio,
        fecha_entrega,
        page=1,
        options=1,
        por_vencer=0,
        vencido=0,
        fec_hoy='',
        fec_ven
    } = req.query;
    
    let query = { _id:id };
    if(id===undefined){
        query = { };
    }

    

    if(id===undefined & solicitante!="" & solicitante!==undefined){
        query.solicitante=mongoose.Types. ObjectId(solicitante)
    }

    if(id===undefined & ingresado!="" & ingresado!==undefined){
        query.ingresado=(ingresado==true || ingresado=="true")?true:false
    }

    if(id===undefined & gerencia!="" & gerencia!==undefined){
        query.gerencia=gerencia
    }

    if(id===undefined & tarea!="" & tarea!==undefined){
        query.tarea=tarea
    }

    if(id===undefined & perfil!="" & perfil!==undefined & gst===undefined){
        query.gst=mongoose.Types. ObjectId(perfil)
    
        /*if(perfil=="62fb0fae57ae2b6d49ac5b88"){
            query.gst=mongoose.Types. ObjectId(perfil)
        }


        if(perfil=="62fb0fb757ae2b6d49ac5b89"){
            query.bko=mongoose.Types. ObjectId(perfil)
        }*/
        
    }

    if(id===undefined & gst!==undefined){
        query.gst=mongoose.Types.ObjectId(gst)
    }

    if(id===undefined & bko!==undefined){
        query.bko=mongoose.Types.ObjectId(bko)
    }

    if(id===undefined & estado_solicitud!="" & estado_solicitud!==undefined){
        query.estado_solicitud=estado_solicitud
    }

    if(id===undefined & estado_resultado!="" & estado_resultado!==undefined){
        query.estado_resultado=estado_resultado
    }

    if(id===undefined & fecha_solicitud!="" & fecha_solicitud!==undefined){
        query.fecha_solicitud=fecha_solicitud
    }

    if(id===undefined & fecha_inicio!="" & fecha_inicio!==undefined){
        query.fecha_inicio=fecha_inicio
    }

    if(id===undefined & fecha_entrega!="" & fecha_entrega!==undefined){
        query.fecha_entrega=fecha_entrega
    }

    if(por_vencer==1){
        query.fecha_entrega={$gte: fec_hoy,$lte:  fec_ven}
    }

    if(vencido==1){
        query.fecha_entrega={$lt:fec_hoy}
        query.estado_solicitud={$ne:mongoose.Types.ObjectId("62fad63448d35ca4acd1467f")}
    }
   
    //query.fecha_entrega={$gte: "2022-10-31",$lte:  ''}

    //query.estado_solicitud={$ne:mongoose.Types.ObjectId("62fad63448d35ca4acd1467f")}

    //let querys={estado_solicitud:{$ne:mongoose.Types.ObjectId("62fad63448d35ca4acd1467f")}}

    const optionsPag = {
        page: page,
        limit: 10,
        populate:[
            { path: "gerencia",model:Gerencia},
            { path: "contrato",model:Contrato},
            { path: "tarea",model:Tarea},
            { path: "estado_solicitud",model:EstadoSolicitud},
            { path: "gst",model:Usuario},
            { path: "bko",model:Usuario},
            { path: "estado_resultado",model:EstadoResultado},
            { path: "solicitante",model:Usuario}
        ]
    };




    if(options==1){
        const [ total, solicitudes  ] = await Promise.all([
            Solicitud.countDocuments(query),
            Solicitud.paginate(query,optionsPag)
        ]);
    
        res.json({
            total,
            solicitudes
        });
    }else{
        const [ total, solicitudes  ] = await Promise.all([
            Solicitud.countDocuments(query),
            Solicitud.find(query).
            populate( { path: "gerencia",model:Gerencia}).
            populate( { path: "contrato",model:Contrato}).
            populate( { path: "tarea",model:Tarea}).
            populate( { path: "estado_solicitud",model:EstadoSolicitud}).
            populate( { path: "gst",model:Usuario}).
            populate( { path: "bko",model:Usuario}).
            populate( { path: "estado_resultado",model:EstadoResultado}).
            populate( { path: "solicitante",model:Usuario})
        ]);
    
        res.json({
            total,
            solicitudes
        });
    }

    
}

const getFecEntrega=(dias)=>{
    hoy = new Date();
    i=0;
    while (i<parseInt(dias)) { // 7 días habiles
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

    

    let idsecuencia=(solicitudes.length==0)?1:solicitudes[0].idsecuencia+1

    const { gerencia, contrato, tarea, gst ,bko,estado_solicitud,estado_resultado,observacion,fecha_solicitud,fecha_inicio,randomId,ingresado,solicitante,sla} = req.body;
    let fecha_entrega=getFecEntrega(sla);
    const solicitud = new Solicitud({ gerencia, contrato, tarea, gst ,bko,estado_solicitud,estado_resultado,observacion,fecha_solicitud,fecha_inicio,fecha_entrega,idsecuencia,randomId ,ingresado,solicitante});

    // Guardar en BD
    await solicitud.save();

    
    const usuario_ = await Usuario.findById(mongoose.Types. ObjectId(solicitante));

    let solicitud_=solicitud._id
    let evento=`Nueva Solicitud -  En proceso - ${usuario_.nombre}`
    const bitacoraSolicitud = new BitacoraSolicitud({ solicitud_,evento });
    await bitacoraSolicitud.save();

    let usuario=gst
    let tipo="Solicitud"
    let link="/solicitud/"+solicitud_
    const notificacioUsuario= new NotificacionUsuario({usuario,tipo,link})
    await notificacioUsuario.save();

    usuario=bko
    tipo="Solicitud"
    link="/solicitud/"+solicitud_
    const notificacioUsuarioB= new NotificacionUsuario({usuario,tipo,link})
    await notificacioUsuarioB.save();

    /** Notificacion */
    const solicitudA = await Solicitud.findById(solicitud_);
 
    let queryContrato={"_id":mongoose.Types. ObjectId(solicitudA.contrato)}

    const [ contratos ] = await Promise.all([
        Contrato.find(queryContrato).
        populate({ path: "adc",model:Usuario})
    ]);

    usuario=contratos[0].adc._id
    tipo="Ingreso Nueva Solicitud"
    link="/solicitud/"+solicitud_
    const notificacioUsuarioC= new NotificacionUsuario({usuario,tipo,link})
    await notificacioUsuarioC.save();
    /*Fin Notificacion*/

    res.json({
        solicitud
    });
}


const solicitudesPut = async(req, res = response) => {

    const { id } = req.params;

    const { estado_solicitud, fecha_inicio, fecha_entrega, gst, bko,estado_resultado,ingresado,solicitante } = req.body;
    let dataUpdate;
    let evento;

    let solicitud_=id
    

    let tituloNotificacionADC=""
    let solicitudTerminada=""
    if(ingresado!==undefined){
        dataUpdate={
            _id:id,
            ingresado:ingresado,
        } 
    }else if(estado_resultado===undefined){
        dataUpdate={
            _id:id,
            estado_solicitud:estado_solicitud,
            fecha_inicio:fecha_inicio,
            fecha_entrega:fecha_entrega,
            gst:gst,
            bko:bko
        } 

        if(estado_solicitud=="62fad63448d35ca4acd1467f"){
            solicitudTerminada=" - Terminada"
        }

        const dataES= await EstadoSolicitud.findById(mongoose.Types. ObjectId(estado_solicitud))
        const usuario_ = await Usuario.findById(mongoose.Types. ObjectId(solicitante));
        evento=`Actualización Estado Solicitud - ${dataES.nombre_estado} - ${usuario_.nombre}`

        let usuario=gst
        tipo="Estado Solicitud"
        tituloNotificacionADC=tipo
        link="/solicitud/"+solicitud_
        const notificacioUsuario= new NotificacionUsuario({usuario,tipo,link})
        await notificacioUsuario.save();

        usuario=bko
        const notificacioUsuarioB= new NotificacionUsuario({usuario,tipo,link})
        await notificacioUsuarioB.save();
    }else{
        dataUpdate={
            _id:id,
            estado_resultado:estado_resultado,
        } 
        const dataER= await EstadoResultado.findById(mongoose.Types. ObjectId(estado_resultado))
        const usuario_ = await Usuario.findById(mongoose.Types. ObjectId(solicitante));
        evento=`Actualización Estado Resultado - ${dataER.nombre_resultado}- ${usuario_.nombre}`

        let usuario=gst
        tipo="Estado Resultado"
        tituloNotificacionADC=tipo
        link="/solicitud/"+solicitud_
        const notificacioUsuario= new NotificacionUsuario({usuario,tipo,link})
        await notificacioUsuario.save();

        usuario=bko
        const notificacioUsuarioB= new NotificacionUsuario({usuario,tipo,link})
        await notificacioUsuarioB.save();
    }

    
    const solicitud = await Solicitud.findByIdAndUpdate( id, dataUpdate );
    let queryContrato={"_id":mongoose.Types. ObjectId(solicitud.contrato)}

    const [ contratos ] = await Promise.all([
        Contrato.find(queryContrato).
        populate({ path: "adc",model:Usuario})
    ]);

    
    const bitacoraSolicitud = new BitacoraSolicitud({ solicitud_,evento });
    await bitacoraSolicitud.save();

    

    usuario=contratos[0].adc._id
    tipo="Actualizacion "+tituloNotificacionADC+" "+solicitudTerminada
    link="/solicitud/"+solicitud_
    const notificacioUsuarioB= new NotificacionUsuario({usuario,tipo,link})
    await notificacioUsuarioB.save();

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