const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');
const Rol = require('../models/role');
const Perfil = require('../models/perfil.js');


const sendEmail=(email,nombre,clave)=>{
    var https = require('https');
    var postData=JSON.stringify({
        data:
          {
            name_campaign : "Envio desde sisadmin",
            subject : "Reestablecimiento de contraseña",
            html: "Su clave de acceso es: "+clave+" .Recuerde cambiar su clave para mayor seguridad.",
            email: {correo:email,nombre:nombre},
            remitente: {correo:"platforms@inticousa.com",nombre:"SisAdmin"}
          }  
      })
    var options = {
        host: 'mailingperu.intico.com.pe',
        path:'/mailing/v1/demo/EnviarMailing',
        //port: '1338',
        method: 'POST',
        headers: {
            'apikey': '62940aa827dd600bfe1d65511282c1b5c577451c2b9002bfe326e83627fc0673',
            'user':'Mining',
            'Content-Type':'application/json'
        }
    };

    callback = function(response) {
        var str = ''
        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            //console.log(str);
        });
    }

    var req = https.request(options, callback);
    req.write(postData);
    req.end();
}

const loginGet = async(req = request, res = response) => {

    const { emailS="" } = req.query;
    const query = { correo:emailS.toLowerCase()};

    const [ total, validation  ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query,{ "correo":1,"nombre":1,"password":1}).
        populate( { path: "perfil",model:Perfil})
    ]);

    if(total===1){
        sendEmail(validation[0].correo,validation[0].nombre,validation[0].password)
    }

    res.json({
        total
    });
}

const loginPost = async(req, res = response) => {
    
    const { login, password } = req.body;
    const query = { login: login,password:password,estado:true };
 
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
    loginGet,
    loginPost,
    loginPatch
}