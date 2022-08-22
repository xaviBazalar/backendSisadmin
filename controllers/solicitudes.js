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
const EstadoResultado= require('../models/estadoResultado')

const solicitudesGet = async(req = request, res = response) => {

    const { id } = req.query;
    let query = { _id:id };

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

    let idsecuencia=solicitudes[0].idsecuencia+1
    const { gerencia, contrato, tarea, gst ,bko,estado_solicitud,estado_resultado,observacion,fecha_solicitud,fecha_inicio} = req.body;
    const solicitud = new Solicitud({ gerencia, contrato, tarea, gst ,bko,estado_solicitud,estado_resultado,observacion,fecha_solicitud,fecha_inicio,fecha_entrega,idsecuencia });

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