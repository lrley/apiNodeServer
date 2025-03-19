const mongoose = require('mongoose')
const {fechaEcuador} =  require('../helpers/fechaActual')

const dbConexion = async () => {
    
try {
    
   await mongoose.connect(process.env.BASE_REST_SERVER);
   console.log('Base de Datos de Mongo Atlas Web Conectada...', fechaEcuador())
   

} catch (error) {
    console.log(error)
    throw new Error('Error a la hora de iniciar la base de datos Mongo Atlas Web')
}

}


const dbConexionDesarrollo = async()=>{

    try {


        await mongoose.connect(process.env.BASE_DESARROLLO)
        console.log('Base de Datos de Desarrollo Conectada...', fechaEcuador());
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos Desarrollo')
    }

}


module.exports = {
    dbConexion,
    dbConexionDesarrollo
}