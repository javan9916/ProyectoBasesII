'use strict'

var express = require('express');
var router = express.Router();

// Pagina de Inicio
router.get('/', function(req, res, next){
    res.Router('index', {title: 'Pagina de Inicio'})
});

module.exports = router; 