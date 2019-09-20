'use strict'

//Dependencias
var express = require('express');
var bodyParser = require('body-parser'); 

var mssql = require('mssql');

var http = require('http');
var path = require('path');

var app = express();

// Rutas

var index = require('./Routes/index');
var usuarios = require('./Routes/usuarios');

/* 
    Convierte a objetos JSON los datos que llegan por peticiones
    http y asi poder trabajar con ellos dentro del proyecto.
*/

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

// Middleware
app.use(function(req, res, result){
    // Acceso a las conexiones que requieran de esta aplicación
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept', 'application/json', 'text/json');
    next();
});

// Index
app.use('/', index);

//Usuarios
app.use('/Usuarios', usuarios);


// Peticion GET para mostrar los usuarios
app.get('/json/Usuarios', function(req, res, result){
    var request = new mssql.Request();
    request.query("SELECT * FROM Usuarios", function(err, result){
        if (err)
            return next(err);

        var data = {};
        data = result.recordset;
        res.send(data);
    });
});

module.exports = app;
