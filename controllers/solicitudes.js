const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

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


const solicitudesGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = {  };

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
    
        Solicitud.find({}, function (err, solicitudes) {
            Gerencia.populate(solicitudes, { path: "gerencia" }, function (err, solicitudes) {
                Contrato.populate(solicitudes, { path: "contrato" }, function (err, solicitudes) {
                    Tarea.populate(solicitudes, { path: "tarea" }, function (err, solicitudes) {
                        EstadoSolicitud.populate(solicitudes, { path: "estado_solicitud" }, function (err, solicitudes) {
                            Usuario.populate(solicitudes, { path: "gst" }, function (err, solicitudes) {
                                Usuario.populate(solicitudes, { path: "bko" }, function (err, solicitudes) {
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
    

    /*res.json({
        total,
        solicitudes
    });*/
}

const solicitudesPost = async(req, res = response) => {
    
    const { gerencia, contrato, tarea, gst ,bko,estado_solicitud,observacion,fecha_solicitud,fecha_inicio} = req.body;
    const solicitud = new Solicitud({ gerencia, contrato, tarea, gst ,bko,estado_solicitud,observacion,fecha_solicitud,fecha_inicio });

    // Guardar en BD
    await solicitud.save();

    res.json({
        solicitud
    });
}


const solicitudesPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}





module.exports = {
    solicitudesGet,
    solicitudesPost,
    solicitudesPatch,
}