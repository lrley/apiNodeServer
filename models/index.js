
const  Categoria = require('./categoriaDB');
const  rolDB       = require('./rolDB');
const  server      = require('./server');
const  usuarioDB   = require('./usuarioDB');
const Producto= require('./productoDB');



module.exports = {
    Categoria,
    Producto,
    rolDB,
    server,
    usuarioDB,
}