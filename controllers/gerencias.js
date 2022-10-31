const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Gerencia = require('../models/gerencia');



const gerenciaGet = async(req = request, res = response) => {

    const { limite = 8, desde = 0, estado="",page=1,options=1 } = req.query;
    const query = {  };//estado: true
    if(estado!==undefined && estado!=""){
        query.estado=true
    }

    const optionsPag = {
        page: page,
        limit: 10
      };

    if(options==1){
        const [ total, gerencias ] = await Promise.all([
            Gerencia.countDocuments(query),
            Gerencia.paginate(query,optionsPag)
        ]);

        res.json({
            total,
            gerencias
        });
    }else{
        const [ total, gerencias ] = await Promise.all([
            Gerencia.countDocuments(query),
            Gerencia.find(query)
        ]);

        res.json({
            total,
            gerencias
        });
    }
    
}

const gerenciaPost = async(req, res = response) => {

    const { nombre_gerencia,estado } = req.body;
    const gerencia = new Gerencia({ nombre_gerencia, estado });

    // Guardar en BD
    await gerencia.save();

    res.json({
        gerencia
    });

}

const gerenciaPut = async(req,res = response) => {
    //const { id } = req.params;
    const { id,nombre_gerencia,estado} = req.body;

    const dataUpdate={
        _id:id,
        nombre_gerencia:nombre_gerencia,
        estado:estado
    }

    const gerencia = await Gerencia.findByIdAndUpdate( id, dataUpdate );

    res.json(gerencia);
}


const gerenciaPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - gerenciaPatch'
    });
}




module.exports = {
    gerenciaGet,
    gerenciaPost,
    gerenciaPut,
    gerenciaPatch

}