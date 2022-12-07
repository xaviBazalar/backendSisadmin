const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const  {UploadedFile} = require('express-fileupload');


const filePost = async(req, res = response) => {

    const path = require("path");

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const { archivo } = req.files ;
    console.log(archivo)

    let dataArchivo=archivo.name.split(".");
    let extensionFile=(archivo.mimetype=="image/png")?"png":dataArchivo[1]
    extensionFile=(archivo.mimetype=="image/jpg")?"jpg":extensionFile
    extensionFile=(archivo.mimetype=="image/jpeg")?"jpg":extensionFile

    const nameFile=(archivo).md5+"."+extensionFile;
    archivo.mv('./uploads/' + nameFile)
    res.json({
        urlFile:nameFile
    });
    /*if((archivo).mimetype!="image/png" 
        && (archivo).mimetype!="image/jpg" 
        && (archivo).mimetype!="image/jpeg"){
        return res.status(500).json({
            msg:"Extension no valida"
        });
    }*/
    
}

const fileGet = async(req,res=response)=>{
    const path = require("path");
    const fs   = require('fs');

    const { id } = req.query;

    const uploadPath =path.join( __dirname , '../uploads/' , id );
    
    if ( fs.existsSync( './uploads' ) ) {
        return res.sendFile( uploadPath )
    }else{
        res.status(500).json({
            msg: 'Error en la consulta del archivo'
        })    
    }
}


const filePatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}





module.exports = {
    fileGet,
    filePost,
    filePatch,
}