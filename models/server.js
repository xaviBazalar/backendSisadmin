const express = require('express');
const cors = require('cors');
const fileUpload =require('express-fileupload')
const { dbConnection } = require('../database/config');
const https = require('https');
const fs = require('fs');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.tareasPath = '/api/tareas';
        this.estadoResultadoPatch = '/api/estadoResultado';
        this.estadoSolicitudPatch = '/api/estadoSolicitud';
        this.gerenciaPatch = '/api/gerencia';
        this.contratosPath = '/api/contratos';
        this.tareasContratoPatch='/api/tareasContrato';
        this.solicitudesPatch='/api/solicitudes'
        this.solicitudesUsuarioPatch='/api/solicitudesUsuario'
        this.loginPatch='/api/login'
        this.historialResultadoSolicitudPatch='/api/historialResultadoSolicitud'
        this.filePatch='/api/upload'
        this.documentosEntradaPatch='/api/documentosEntrada'
        this.documentosSalidaPatch='/api/documentosSalida'
        this.tareaDocumentosEntradaPatch='/api/tareaDocumentosEntrada'
        this.tareaDocumentosEntradaSolicitudPatch='/api/tareaDocumentosEntradaSolicitud'
        this.tareaDocumentosSalidaSolicitudPatch='/api/tareaDocumentosSalidaSolicitud'
        this.tareaDocumentosSalidaPatch='/api/tareaDocumentosSalida'
        this.documentacionSolicitudPatch='/api/documentacionSolicitudes'
        this.bitacoraSolicitudPatch='/api/bitacoraSolicitud'
        this.gestionSolicitudPatch='/api/gestionSolicitud'
        this.notificacionUsuarioPatch='/api/notificacionesUsuario'
        this.perfilesPatch='/api/perfiles'
        this.contratosGerenciaPatch='/api/contratosGerencia'
        this.reportExcelPatch='/api/reporteExcel'
        this.dashboardPatch='/api/dashboard'
        this.recoveryPatch='/api/recovery'
        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();


    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {
        this.app.use(fileUpload({
            createParentPath: true
        }));
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

        /*this.app.use(fileUpload({
            useTempFiles:true,
            tempFileDir:'/tmp/'
        }))*/

    }

    routes() {
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
        this.app.use( this.tareasPath, require('../routes/tareas'));
        this.app.use( this.estadoResultadoPatch, require('../routes/estado_resultados'));
        this.app.use( this.estadoSolicitudPatch, require('../routes/estado_solicitudes'));
        this.app.use( this.gerenciaPatch, require('../routes/gerencias'));
        this.app.use( this.contratosPath, require('../routes/contratos'));
        this.app.use( this.tareasContratoPatch, require('../routes/tareasContrato'));
        this.app.use( this.solicitudesPatch, require('../routes/solicitudes'));
        this.app.use( this.solicitudesUsuarioPatch, require('../routes/solicitudesUsuario'))
        this.app.use( this.loginPatch, require('../routes/login'));
        this.app.use( this.historialResultadoSolicitudPatch, require('../routes/historialResultadoSolicitud'));
        this.app.use( this.filePatch, require('../routes/upload'))
        this.app.use( this.documentosEntradaPatch, require('../routes/documentosEntrada'))
        this.app.use( this.documentosSalidaPatch, require('../routes/documentosSalida'))
        this.app.use( this.tareaDocumentosEntradaPatch, require('../routes/tareaDocumentosEntrada'))
        this.app.use( this.tareaDocumentosEntradaSolicitudPatch, require('../routes/tareaDocumentoEntradaSolicitud'))
        this.app.use( this.tareaDocumentosSalidaPatch, require('../routes/tareaDocumentosSalida'))
        this.app.use( this.tareaDocumentosSalidaSolicitudPatch, require('../routes/tareaDocumentoSalidaSolicitud'))
        this.app.use( this.documentacionSolicitudPatch, require('../routes/documentacionSolicitudes'))
        this.app.use( this.bitacoraSolicitudPatch, require('../routes/bitacoraSolicitud'))
        this.app.use( this.gestionSolicitudPatch, require('../routes/gestionSolicitud'))
        this.app.use( this.notificacionUsuarioPatch, require('../routes/notificacionesUsuario'))
        this.app.use( this.perfilesPatch, require('../routes/perfiles'))
        this.app.use( this.contratosGerenciaPatch, require('../routes/contratosGerencia'))
        this.app.use( this.reportExcelPatch, require('../routes/reporteExcel'))
        this.app.use( this.dashboardPatch, require('../routes/dashboard'))
        this.app.use( this.recoveryPatch, require('../routes/recoveryUsuario'))
    }

    listen() {
        if(process.env.FLAG_HTTPS==0){
            this.app.listen( this.port, () => {
                console.log('Servidor corriendo en puerto', this.port );
            });
        }else{
            const PUERTO = process.env.PORT_HTTPS;

            https.createServer({
            cert: fs.readFileSync(process.env.FILE_CRT),
            key: fs.readFileSync(process.env.FILE_KEY)
            },this.app).listen(PUERTO, function(){
                console.log('Servidor https corriendo en el puerto '+PUERTO);
            });
        }        

    }

}




module.exports = Server;
