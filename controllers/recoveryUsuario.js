const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');

const RecoveryUsuario = require('../models/recoveryUsuario');
const Usuario = require('../models/usuario');


const recoverUsuarioGet = async(req = request, res = response) => {

    const { hash_id="" } = req.query;
    const query = { hash_recovery:hash_id };

    
        const [ recovery_usuario ] = await Promise.all([
            RecoveryUsuario.find(query) 
        ]);
    
        res.json({
            recovery_usuario
        });
    
}

const recoverUsuarioUpdate = async(req, res = response) => {
    const { id,has_recovery,password} = req.body;

    const dataUpdate={
        _id:id,
        estado:true,
    }

    const dataUpdateUsuario={
        password:password,
    }


    const recovery_usuario = await RecoveryUsuario.findByIdAndUpdate( id, dataUpdate );
    
    const usuario = await Usuario.find({"login":recovery_usuario.usuario})
    const uusario_recovery = await Usuario.findByIdAndUpdate( usuario[0]._id, dataUpdateUsuario );

    res.json(recovery_usuario);

}







module.exports = {
    recoverUsuarioGet,
    recoverUsuarioUpdate
}