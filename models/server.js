const express = require('express');
const cors = require('cors');
const { dbConexion, dbConexionDesarrollo } = require('../database/config_DB');
const { auth } = require('google-auth-library');


class Server{

    
    constructor() {
    this.app = express();
    this.port = process.env.PUERTO;

        this.paths = {
                 rutasAuth: '/api/auth',
               rutasBuscar: '/api/buscar',
            rutasCategoria: '/api/categorias',
              rutasUsuario: '/api/usuarios',
                  rutasRol: '/api/roles',
              rutasProducto: '/api/productos',
        }

    /*rutas 
    this.rutasUsuario = '/api/usuarios';
    this.rutasRol = '/api/roles';
    this.rutasAuth = '/api/auth';
    this.rutasCategoria =  '/api/categorias';
    */
    
    //Conectar a Base de datos
    //this.conectarBD();
    
    this.conectarDBDesarrollo();
    
    
    //Middlewares
    this.middlewares();

    //Rutas para mi aplicacion
    this.routes();
    }

    async conectarBD(){
        await dbConexion();
       
    }
    
    async conectarDBDesarrollo(){
        
        await dbConexionDesarrollo();
    }


    middlewares(){

        // CORS
            this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio Publico
            this.app.use(express.static('public'))


    }
    
    routes(){
         this.app.use( this.paths.rutasUsuario, require('../routes/rutaUsuarios'));
         this.app.use( this.paths.rutasBuscar, require('../routes/rutaBuscar'));
         this.app.use( this.paths.rutasRol, require('../routes/rutaRoles'));
         this.app.use(this.paths.rutasAuth, require('../routes/rutaAuth'));
         this.app.use(this.paths.rutasCategoria, require('../routes/rutaCategorias'))
         this.app.use(this.paths.rutasProducto, require('../routes/rutaProductos'))
    }

    listen(){

        this.app.listen( this.port, ()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })

    }



}


module.exports = Server;


