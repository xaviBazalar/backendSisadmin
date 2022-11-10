const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Solicitud = require('../models/solicitud');



const dashboardGet = async(req = request, res = response) => {

    const { reporte = "",fec_desde="",fec_hasta="" } = req.query;
    const query = {  };//estado: true

    let carga_trabajo=await Solicitud.aggregate([
        { 
            "$lookup": {
              "from": "estado_solicitud",
              "localField": "estado_solicitud",
              "foreignField": "_id",
              "as": "estado_solicitud"
            }
        },
        {
            $unwind: "$estado_solicitud"
        },
        { 
            "$lookup": {
              "from": "usuarios",
              "localField": "bko",
              "foreignField": "_id",
              "as": "bko"
            }
        },
        {
            $unwind: "$bko"
        },
        { "$group": {
            "_id": {
                "estado_solicitud": "$estado_solicitud.nombre_estado",
                "bko": "$bko.nombre",
                "id": "$bko._id",
            },
            "total": { "$sum": 1 }
        }}
    ])

    let vencidos=await Solicitud.aggregate([
        {
            "$match":{
                "fecha_entrega":{$lt:"2022-10-31"}
            }
        },
        { 
            "$lookup": {
              "from": "usuarios",
              "localField": "bko",
              "foreignField": "_id",
              "as": "bko"
            }
        },
        {
            $unwind: "$bko"
        },
        {
            $group: { "_id": {
                "nombre":"$bko.nombre",
                "id":"$bko._id"
            }, "total": { "$sum": 1 } }
        }
    ])

    let carga_trabajo_total=await Solicitud.aggregate([
        { 
            "$lookup": {
              "from": "estado_solicitud",
              "localField": "estado_solicitud",
              "foreignField": "_id",
              "as": "estado_solicitud"
            }
        },
        {
            $unwind: "$estado_solicitud"
        },

        { "$group": {
            "_id": {
                "estado_solicitud": "$estado_solicitud.nombre_estado",
                "id": "$estado_solicitud._id",
            },
            "total": { "$sum": 1 }
        }}
    ])

    let tareas_por_persona=await Solicitud.aggregate([
        { 
            "$lookup": {
              "from": "usuarios",
              "localField": "gst",
              "foreignField": "_id",
              "as": "gst"
            }
        },
        {
            $unwind: "$gst"
        },

        { "$group": {
            "_id": {
                "nombre": "$gst.nombre",
                "id": "$gst._id",
            },
            "total": { "$sum": 1 }
        }}
    ])

    let solicitudes_nuevas_semana=await Solicitud.aggregate([
        {
            "$match": {"$expr": {
                $and: [
                        {
                            $gte: ['$fecha_solicitud',fec_desde]
                        },
                        {
                            $lte: ['$fecha_solicitud',fec_hasta]
                        }
                    ]
                }
            }
        },
        { "$group": {
            "_id": {
                "fecha_solicitud": "$fecha_solicitud"
            },
            "total": { "$sum": 1 }
        }}
    ])

    res.json({
            carga_trabajo,
            vencidos,
            carga_trabajo_total,
            tareas_por_persona,
            solicitudes_nuevas_semana
    });
    
    
}


module.exports = {
    dashboardGet
}