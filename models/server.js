const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.tareasPath = '/api/tareas';
        this.estadoResultadoPatch = '/api/estadoResultado';
        this.estadoSolicitudPatch = '/api/estadoSolicitud';
        this.gerenciaPatch = '/api/gerencia';

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

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
        this.app.use( this.tareasPath, require('../routes/tareas'));
        this.app.use( this.estadoResultadoPatch, require('../routes/estado_resultados'));
        this.app.use( this.estadoSolicitudPatch, require('../routes/estado_solicitudes'));
        this.app.use( this.gerenciaPatch, require('../routes/gerencias'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
