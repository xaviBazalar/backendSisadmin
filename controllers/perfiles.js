const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Schema } = require('mongoose');


const Rol= require('../models/role')
const Perfil= require('../models/perfil')

const perfilesGet = async(req = request, res = response) => {
    let query = { };

    const [ total, perfiles ] = await Promise.all([
        Perfil.countDocuments(query),
        Perfil.find(query).
        populate( { path: "rol",model:Rol})
    ]);

    res.json({
        total,
        perfiles
    });
}

const perfilesPost = async(req, res = response) => {


}

const perfilesPut = async(req, res = response) => {

    const { id } = req.params;

}

const perfilesPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}


module.exports = {
    perfilesGet,
    perfilesPost,
    perfilesPut,
    perfilesPatch,
}