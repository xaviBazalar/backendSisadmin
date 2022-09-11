const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Tarea = require('../models/tarea');



const tareasGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, tareas ] = await Promise.all([
        Tarea.countDocuments(query),
        Tarea.find(query)
    ]);

    res.json({
        total,
        tareas
    });
}

const tareasPost = async(req, res = response) => {

    
    const { nombre_tarea, frecuencia, SLA} = req.body;
    const tarea = new Tarea({ nombre_tarea, frecuencia, SLA });

    // Guardar en BD
    await tarea.save();

    res.json({
        tarea
    });
}


const tareasPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - tareasPatch'
    });
}


module.exports = {
    tareasGet,
    tareasPost,
    tareasPatch
}