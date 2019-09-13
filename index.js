"use strict";
//variable mssql para conexion a SQL Server
var mssql = require('mssql');

var app = require('./app');

// Plantillas ejs
app.set('view engine', 'ejs');

//Establece el puerto
var port = process.env.port || 3000;

// Variables de conexion
var config = {
    user: 'sa',
    password: '2018100294',
    server: 'DESKTOP-VJK1DE3',
    database: 'Gestor_Almacenamiento'
};

// En caso de error
var connection = mssql.connect(config, function(err, res){
    if(err){
        throw err;
    } else {
        console.log("CONECTADO CORRECTAMENTE A LA BASE DE DATOS");
        app.listen(port, function(){
            console.log("Api Rest Running http://localhost:"+port);
        });
    }
});

// Para que el modulo pueda ser usado en otros archivos
module.exports = app;