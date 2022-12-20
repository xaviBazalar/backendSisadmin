const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Tarea = require('../models/tarea');



const tareasGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0,page=1,options=1,nombre_tarea="" } = req.query;
    let query = {  };//estado: true

    const optionsPag = {
        page: page,
        limit: 10,
      };

    if(nombre_tarea!=""){
        query.nombre_tarea={$regex:`.*${nombre_tarea},*`};//
    }

    if(options==1){
        const [ total, tareas ] = await Promise.all([
            Tarea.countDocuments(query),
            Tarea.paginate(query,optionsPag)
        ]);
    
        res.json({
            total,
            tareas
        });
    }else{
        const [ total, tareas ] = await Promise.all([
            Tarea.countDocuments(query),
            Tarea.find(query)
        ]);
    
        res.json({
            total,
            tareas
        });
    }

   
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

const tareasPut = async(req,res = response) => {
    //const { id } = req.params;
    const { id,nombre_tarea,frecuencia,SLA ,estado} = req.body;

    const dataUpdate={
        _id:id,
        nombre_tarea:nombre_tarea,
        frecuencia:frecuencia,
        SLA:SLA,
        estado:estado
    }

    const tarea = await Tarea.findByIdAndUpdate( id, dataUpdate );

    res.json(tarea);
}


const tareasPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - tareasPatch'
    });
}

const tareasDel = async( req, res ) =>{
    const { id } = req.body;

    tarea = await Tarea.findByIdAndDelete(id)

    res.json({
        ok: true
    });  
}


module.exports = {
    tareasGet,
    tareasPost,
    tareasPut,
    tareasPatch,
    tareasDel
}