const { response, request } = require('express');

const Solicitud = require('../models/solicitud');
const Gerencia = require('../models/gerencia');
const Contrato = require('../models/contrato');
const Tarea = require('../models/tarea');
const Usuario = require('../models/usuario');
const EstadoSolicitud = require('../models/estadoSolicitud.js');
const EstadoResultado= require('../models/estadoResultado')

const reporteGet = async(req = request, res = response) => {

    const { archivo="" } = req.query;
    const path = require("path");
    const fs   = require('fs');
    

    const reporteExcelPath =path.join( __dirname , '../docExcel/' , archivo );
    
    if ( fs.existsSync( './docExcel' ) ) {
        return res.sendFile( reporteExcelPath )
    }else{
        res.status(500).json({
            msg: 'Error en la consulta del archivo'
        })    
    }

}

const reportePost = async(req = request, res = response) => {

    const { desde="",hasta=""  } = req.body;  
    let nroAletorio=new Date().getTime()
    let nombreExcel="docExcel/Reporte-"+nroAletorio+".xlsx"
    let archivoReporte=await generarExcel(desde,hasta,nombreExcel)

    res.json({
        "total":"1",
        "archivo":"Reporte-"+nroAletorio+".xlsx",
        "reporte":archivoReporte.toString()
    });
}

const generarExcel=async(desde,hasta,nombreExcel)=>{
    // Require library
    var xl = require('excel4node');

    // Create a new instance of a Workbook class
    var wb = new xl.Workbook();

    // Add Worksheets to the workbook
    var ws = wb.addWorksheet('Sheet 1');

    // Create a reusable style
    var style = wb.createStyle({
    font: {
        //color: '#FF0800',
        size: 12,
    },
    //numberFormat: '$#,##0.00; ($#,##0.00); -',
    });

    let query={}
    query.fecha_solicitud={$gte: desde,$lte:  hasta}

    console.log(query)
    const [ solicitudes  ] = await Promise.all([
        Solicitud.find(query).
        populate( { path: "gerencia",model:Gerencia}).
        populate( { path: "contrato",model:Contrato}).
        populate( { path: "tarea",model:Tarea}).
        populate( { path: "estado_solicitud",model:EstadoSolicitud}).
        populate( { path: "gst",model:Usuario}).
        populate( { path: "bko",model:Usuario}).
        populate( { path: "estado_resultado",model:EstadoResultado}).
        populate( { path: "solicitante",model:Usuario})
    ]);


    let fila=2;
    //Sol.N°	Solicitante	Situacion	Nombre	Tarea	Fecha	Estado	Asignada	Fecha	Resultado	
    ws.cell(1, 1).string('Sol.N°').style(style);
    ws.cell(1, 2).string('Solicitante').style(style);
    ws.cell(1, 3).string('Situacion').style(style);
    ws.cell(1, 4).string('Nombre').style(style);
    ws.cell(1, 5).string('Tarea').style(style);
    ws.cell(1, 6).string('Fecha Solicitud').style(style);
    ws.cell(1, 7).string('Estado').style(style);
    ws.cell(1, 8).string('Asignada').style(style);
    ws.cell(1, 9).string('Fecha Inicio').style(style);
    ws.cell(1, 10).string('Fecha Entrega').style(style);
    ws.cell(1, 11).string('Resultado').style(style);

    for(let solicitud of solicitudes){
        ws.cell(fila, 1).number(solicitud.idsecuencia).style(style);
        ws.cell(fila, 2).string(solicitud.solicitante.nombre).style(style);
        ws.cell(fila, 3).string("Enviada").style(style);
        ws.cell(fila, 4).string(solicitud.contrato.contradoid+" "+solicitud.contrato.contrato).style(style);
        ws.cell(fila, 5).string(solicitud.tarea.nombre_tarea).style(style);
        ws.cell(fila, 6).string(solicitud.fecha_solicitud).style(style);
        ws.cell(fila, 7).string(solicitud.estado_solicitud.nombre_estado).style(style);
        ws.cell(fila, 8).string(solicitud.gst.nombre).style(style);
        ws.cell(fila, 9).string(solicitud.fecha_inicio).style(style);
        ws.cell(fila, 10).string(solicitud.fecha_entrega).style(style);
        ws.cell(fila, 11).string(solicitud.estado_resultado.nombre_resultado).style(style);
        ++fila
    }

    // Set value of cell A1 to 100 as a number type styled with paramaters of style
    /*ws.cell(1, 1)
    .number(100)
    .style(style);*/

    // Set value of cell B1 to 200 as a number type styled with paramaters of style
    /*ws.cell(1, 2)
    .number(200)
    .style(style);*/

    // Set value of cell C1 to a formula styled with paramaters of style
    /*ws.cell(1, 3)
    .formula('A1 + B1')
    .style(style);*/

    // Set value of cell A2 to 'string' styled with paramaters of style
    /*ws.cell(2, 1)
    .string('string')
    .style(style);*/

    // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
    /*ws.cell(3, 1)
    .bool(true)
    .style(style)
    .style({font: {size: 14}});*/

    
    wb.write(nombreExcel);

    return nombreExcel
}


module.exports = {
    reporteGet,
    reportePost
}