const { Router }= require('express');
const { buscar, buscarSinTermino } = require('../controllers/buscar.controller');


const rutaBusqueda = Router();



rutaBusqueda.get('/:coleccion/:termino', buscar)

rutaBusqueda.get('/:coleccion/', buscarSinTermino)

  module.exports = rutaBusqueda