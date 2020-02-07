"use strict";
let sqlPromises = require('./sqlPromises');
let sqlCbs = require('./sqlCbs');

//let mssql = require('mssql');
let config = {
    user: "sa",
    password: "Acjunior007@",
    server: "localhost",
    "database": "Test"
};

//callbacks
sqlCbs(config);

// promises
//sqlPromises(config);

// let conn = new mssql.ConnectionPool(config, err => {
//     if(err){
//         console.log(erro);
//     }
//     else{
//         imprimeTodosRegistros(conn);
//         //insere(conn, "Rodrigo dos Santos", "Itaquera");
//     }
// });

// function imprimeTodosRegistros(conn) {
//     let request = new mssql.Request(conn);
//     request.query("select * from Alunos", (err, registros) => {
//         console.log(registros);
//     });
// }

// function insere(conn, nome, morada){
//     let request = new mssql.Request(conn);
//     request.input("nome", mssql.NVarChar, nome);
//     request.input("morada", mssql.NVarChar, morada);
//     request.query("insert into Alunos (nome, morada) values(@nome, @morada)", (err, registros) =>{
//         if(err){
//             console.log(err);
//             return;
//         }
//         else{
//             imprimeTodosRegistros(conn);
//         }
//     });
// }