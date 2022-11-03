const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Solicitud = require('../models/solicitud');



const dashboardGet = async(req = request, res = response) => {

    const { reporte = "" } = req.query;
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


    res.json({
            carga_trabajo,
            vencidos
    });
    
    
}


module.exports = {
    dashboardGet
}