const moment = require('moment-timezone');

/**
 * Convierte una fecha UTC a formato Ecuador
 * @param {Date|string} fecha - Fecha en formato UTC para convertir
 * @param {boolean} incluirHora - Si es true incluye la hora, si es false solo la fecha
 * @returns {string} Fecha formateada en zona horaria de Ecuador
 */
const convertirFechaEcuador = (fecha, incluirHora = true) => {
    const zonaHoraria = 'America/Guayaquil';
    
    try {
        if (!fecha) {
            return null;
        }

        // Si solo quieren la fecha sin hora
        if (!incluirHora) {
            return moment(fecha)
                .tz(zonaHoraria)
                .format('YYYY-MM-DD');
        }

        // Retorna fecha y hora
        return moment(fecha)
            .tz(zonaHoraria)
            .format('YYYY-MM-DD HH:mm:ss');
            
    } catch (error) {
        console.error('Error al convertir la fecha:', error);
        return null;
    }
};

/**
 * Obtiene la fecha y hora actual en Ecuador
 * @param {boolean} incluirHora - Si es true incluye la hora, si es false solo la fecha
 * @returns {string} Fecha actual en zona horaria de Ecuador
 */
const obtenerFechaActualEcuador = (incluirHora = true) => {
    const zonaHoraria = 'America/Guayaquil';
    
    try {
        if (!incluirHora) {
            return moment()
                .tz(zonaHoraria)
                .format('YYYY-MM-DD');
        }

        return moment()
            .tz(zonaHoraria)
            .format('YYYY-MM-DD HH:mm:ss');
            
    } catch (error) {
        console.error('Error al obtener la fecha actual:', error);
        return null;
    }
};


const fechaEcuador=()=>{

   //Obtener fecha y hora de Ecuador
   const fechaEcuador = moment().tz('America/Guayaquil');
   //Restar 5 horas al crear la fecha para MongoDB
   const fechaAGuardar = new Date(fechaEcuador.subtract(5, 'hours').format());


   return fechaAGuardar;
}


module.exports = {
    convertirFechaEcuador,
    obtenerFechaActualEcuador,
    fechaEcuador
};



