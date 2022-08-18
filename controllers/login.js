const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');
const Rol = require('../models/role');
const Perfil = require('../models/perfil.js');


const loginPost = async(req, res = response) => {
    
    const { login, password } = req.body;
    const query = { login: login,password:password };
    console.log(query)
    Usuario.find(query, function (err, usuarios) {
        Perfil.populate(usuarios, { path: "perfil" }, function (err, usuarios) {
          res.json({
                usuarios
            });
        });
      });

    // Encriptar la contraseña
    //const salt = bcryptjs.genSaltSync();
    //usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    //await usuario.save();

    /*res.json({
        usuario
    });*/
}

const loginPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}


module.exports = {
    loginPost,
    loginPatch
}