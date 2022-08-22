const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const HistorialResultadoSolicitud = require("../models/historialResultadoSolicitud")
const Solicitud = require('../models/solicitud');
const EstadoResultado= require('../models/estadoResultado')
const Usuario = require('../models/usuario')

const historialResultadoSolicitudGet = async(req = request, res = response) => {

    const { id } = req.query;
    let query = { solicitud:id };

    if(id===undefined){
        query = { };
    }

    /*const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite )).populate( { path: "rol" })
    ]);*/

   /* const [ total,solicitudes ] = await Promise.all([
        Solicitud.countDocuments(query),
        Solicitud.find({},function(err,solicitudes){
            Gerencia.populate(solicitudes, { path: "gerencia" })
        })
        
    ]);*/
    
        HistorialResultadoSolicitud.find(query, function (err, historial_resultado_solicitud) {
            Solicitud.populate(historial_resultado_solicitud, { path: "solicitud" }, function (err, historial_resultado_solicitud) {
                EstadoResultado.populate(historial_resultado_solicitud, { path: "estado_resultado" }, function (err, historial_resultado_solicitud) {
                    Usuario.populate(historial_resultado_solicitud, { path: "usuario" }, function (err, historial_resultado_solicitud) {
                        res.json({
                            historial_resultado_solicitud
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
    const { solicitud,estado_resultado,usuario,mensaje} = req.body;
    const solicitudR = new HistorialResultadoSolicitud({ solicitud, estado_resultado,fecha_registro, usuario, mensaje});

    // Guardar en BD
    await solicitudR.save();

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
    historialResultadoSolicitudPatch,
}