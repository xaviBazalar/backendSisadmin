const { Schema, model } = require('mongoose');

const getFecEntrega=()=>{
    hoy = new Date();
    i=0;
    while (i<7) { // 7 días habiles
        hoy.setTime(hoy.getTime()+24*60*60*1000); // añadimos 1 día
        if (hoy.getDay() != 6 && hoy.getDay() != 0)
            i++;  
    }
    fecha = hoy.getDate()+ '/' + ((hoy.getMonth())+1) + '/' + hoy.getFullYear();
    let mes=((hoy.getMonth())+1);
    mes=(mes.toString().length==1)?"0"+mes:mes;
    let dia=hoy.getDate();
    dia=(dia.toString().length==1)?"0"+dia:dia;
    return hoy.getFullYear()+"-"+mes+"-"+dia
}

const SolicitudSchema = Schema({
    gerencia: { type: Schema.ObjectId, ref: "gerencia" },
    contrato: { type: Schema.ObjectId, ref: "contrato" },
    tarea: { type: Schema.ObjectId, ref: "tarea" },
    gst: { type: Schema.ObjectId, ref: "gst" },
    bko: { type: Schema.ObjectId, ref: "bko" },
    estado_solicitud : { type: Schema.ObjectId, ref: "estado_solicitud" },
    estado_resultado:{ type: Schema.ObjectId, ref: "estado_resultado" },
    observacion: {
        type: String
    },
    fecha_solicitud: {
        type: String
    },
    fecha_inicio: {
        type: String
    },
    fecha_entrega: {
        type: String,
        default:getFecEntrega()
    },
    idsecuencia:{
        type:Number,
        default: 2
    },
    randomId: {
        type: String
    },
    notificado: {
        type: Boolean,
        default:false
    },
},
{ 
    collection : 'solicitudes' 
});


SolicitudSchema.methods.toJSON = function() {
    const { __v, ...solicitud  } = this.toObject();
    return solicitud;
}


module.exports = model( 'Solicitud', SolicitudSchema );
