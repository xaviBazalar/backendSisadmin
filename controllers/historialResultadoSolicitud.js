const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const HistorialResultadoSolicitud = require("../models/historialResultadoSolicitud")
const Solicitud = require('../models/solicitud');
const EstadoResultado= require('../models/estadoResultado')
const Usuario = require('../models/usuario')
const BitacoraSolicitud = require('../models/bitacora_solicitud')
const NotificacionUsuario= require('../models/notificacionUsuario')

const historialResultadoSolicitudGet = async(req = request, res = response) => {

    const { id } = req.query;
    let query = { solicitud:id };

    if(id===undefined){
        query = { };
    }

    
        HistorialResultadoSolicitud.find(query, function (err, historial_resultado_solicitud) {
            Solicitud.populate(historial_resultado_solicitud, { path: "solicitud" }, function (err, historial_resultado_solicitud) {
                EstadoResultado.populate(historial_resultado_solicitud, { path: "estado_resultado" }, function (err, historial_resultado_solicitud) {
                    Usuario.populate(historial_resultado_solicitud, { path: "usuario" }, function (err, historial_resultado_solicitud) {
                        Usuario.populate(historial_resultado_solicitud, { path: "usuario_respuesta" }, function (err, historial_resultado_solicitud) {
                            res.json({
                                historial_resultado_solicitud
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

const historialResultadoSolicitudPut = async(req, res = response) => {

    const { id } = req.params;
    const { respuesta,fecha_respuesta,usuario_respuesta ,url_file} = req.body;

    const dataUpdate={
        _id:id,
        respuesta:respuesta,
        fecha_respuesta:fecha_respuesta,
        usuario_respuesta:usuario_respuesta,
        url_file:url_file
    }

    const historialResultadoSolicitud = await HistorialResultadoSolicitud.findByIdAndUpdate( id, dataUpdate );
    let solicitud_=historialResultadoSolicitud.solicitud
    let evento="Actualización Solicitud -  Respuesta Pregunta"
    const bitacoraSolicitud = new BitacoraSolicitud({ solicitud_,evento });
    await bitacoraSolicitud.save();

    

    res.json(historialResultadoSolicitud);
}

const getFecRegistro=()=>{
    var today = new Date();
    var now = today.toLocaleString();
    let fecToday=now.split(",")
    let fecActual=fecToday[0].split("/")
    let mes=(fecActual[0].length==1)?"0"+fecActual[0]:fecActual[0];
    let dia=(fecActual[1].length==1)?"0"+fecActual[1]:fecActual[1];
    fecActual=fecActual[2]+"-"+mes+"-"+dia
    return fecActual+" "+fecToday[1]
}

const historialResultadoSolicitudPost = async(req, res = response) => {
    let fecha_registro=getFecRegistro()
    const { solicitud,estado_resultado,usuario,mensaje,usuario_asignado} = req.body;
    const solicitudR = new HistorialResultadoSolicitud({ solicitud, estado_resultado,fecha_registro, usuario, mensaje});

    // Guardar en BD
    await solicitudR.save();


    let solicitud_=solicitudR.solicitud
    let evento="Actualización Solicitud -  Ingreso Pregunta"
    const bitacoraSolicitud = new BitacoraSolicitud({solicitud_ ,evento });
    await bitacoraSolicitud.save();

    let tipo="Historial Solicitud"
    let link="/solicitud/"+solicitudR.solicitud
    const notificacioUsuario= new NotificacionUsuario({"usuario":usuario_asignado,tipo,link})
    await notificacioUsuario.save();

    res.json({
        solicitudR
    });
}


const historialResultadoSolicitudPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}


module.exports = {
    historialResultadoSolicitudGet,
    historialResultadoSolicitudPost,
    historialResultadoSolicitudPut,
    historialResultadoSolicitudPatch,
}