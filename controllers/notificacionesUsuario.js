const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Schema } = require('mongoose');
const mongoose = require('mongoose');



const NotificacionUsuario= require('../models/notificacionUsuario')
const Usuario= require('../models/usuario')

const notificacionUsuarioGet = async(req = request, res = response) => {

    const { usuario,visto } = req.query;
    let query = {"usuario":mongoose.Types. ObjectId(usuario),"visto": (visto=="true")?true:false}   ;
    
    if(usuario===undefined){
        query = { };
    }

    if(visto=="true"){
        query = {"usuario":mongoose.Types. ObjectId(usuario)}   ;
    }


    const [ total, notificaciones_usuario ] = await Promise.all([
        NotificacionUsuario.countDocuments(query),
        NotificacionUsuario.find(query).
        populate( { path: "usuario",model:Usuario})
    ]);

    res.json({
        total,
        notificaciones_usuario
    });
}

const notificacionUsuarioPost = async(req, res = response) => {


}

const notificacionUsuarioPut = async(req, res = response) => {

    const { id } = req.params;

    const { visto } = req.body;

    const dataUpdate={
        _id:id,
        visto:visto
    }

    const notificacionUsuario = await NotificacionUsuario.findByIdAndUpdate( id, dataUpdate );

    res.json(notificacionUsuario);

}

const notificacionUsuarioPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}


module.exports = {
    notificacionUsuarioGet,
    notificacionUsuarioPost,
    notificacionUsuarioPut,
    notificacionUsuarioPatch,
}