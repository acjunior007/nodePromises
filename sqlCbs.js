'use strict';

let mssql = require('mssql');

function insere(transaction, nome, morada, cb){
    let request = new mssql.Request(transaction);
    request.input("nome", mssql.NVarChar, nome);
    request.input("morada", mssql.NVarChar, morada);
    request.query("insert into alunos (nome, morada) values (@nome, @morada)", (err, registros) => {
        if(registros){
            console.log(registros.recordsets);
        }
        if(cb){
            cb(err);
        }
    });
}

function imprimeTodosRegistros(transaction, cb) {
    let request =new mssql.Request(transaction);
    request.query('select nome, morada from alunos (nolock)', (err, registros) => {
        console.log(registros.recordsets);
        if(cb)
        {
            cb(err);
        }
    });
}

module.exports = function iniciaCodigo(config){
    let conn = new mssql.ConnectionPool(config, err => {
        let tran = new mssql.Transaction(conn);
        tran.begin(err => {
            imprimeTodosRegistros(tran, err => {
                insere(tran, "Antonio", "Santana", err => {
                    if(err){
                        tran.rollback("");
                    }
                    else{
                        console.log("Inserido com sucesso!");
                        tran.commit("");
                    }
                });
            });
        });
    });
}