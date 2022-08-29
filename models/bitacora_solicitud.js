const { Schema, model } = require('mongoose');
const getFecRegistro=()=>{
    var today = new Date();
    var now = today.toLocaleString();
    let fecToday=now.split(",")

    let fecActual=fecToday[0].split("/")
    let mes=(fecActual[0].length==1)?"0"+fecActual[0]:fecActual[0];
    let dia=(fecActual[1].length==1)?"0"+fecActual[1]:fecActual[1];
    fecActual=fecActual[2]+"-"+mes+"-"+dia
    return fecActual+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()
}

const BitacoraSolicitudSchema = Schema({
    solicitud_: { type: Schema.ObjectId, ref: "solicitudes" },
    evento: {
        type: String,
    },
    fecha_registro: {
        type: String,
        default: getFecRegistro()
    },
},
{ 
    collection : 'bitacora_solicitud' 
});


BitacoraSolicitudSchema.methods.toJSON = function() {
    const { __v, ...bitacora_solicitud  } = this.toObject();
    return bitacora_solicitud;
}


module.exports = model( 'BitacoraSolicitud', BitacoraSolicitudSchema );
