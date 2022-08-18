const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Contrato = require('../models/contrato');
const Tarea = require('../models/tarea');
const TareaContrato = require('../models/tareaContrato');

const tareasContratoGet = async(req = request, res = response) => {
 
    const {contrato} = req.query;
    const query = { contrato:contrato};

    /*const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite )).populate( { path: "rol" })
    ]);*/

    TareaContrato.find(query, function (err, tareas) {
        Tarea.populate(tareas, { path: "tarea" }, function (err, tareas) {
          res.json({
            tareas,
            });
        });
      });

    /*res.json({
    total,
        usuarios
    });*/
}


const tareasContratoPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}



module.exports = {
    tareasContratoGet,
    tareasContratoPatch,
}