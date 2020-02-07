'use strict';

let mssql = require('mssql');

function insere (trans, nome, morada, cb){
    let request = new mssql.Request(trans);
    request.input("nome",  mssql.NVarChar, nome);
    request.input("morada", mssql.NVarChar, morada);
    return request.query('insert into alunos(nome, morada) values(@nome, @morada)')        
}

function imprimeTodosRegistros(trans, cb){
    let request = new mssql.Request(trans);
    return request.query('Select nome, morada from alunos (nolock)')
        .then(registros => console.log(registros.recordset));
}

module.exports = (config) => {
    let conn = new mssql.ConnectionPool(config);
    let tran = null;
    conn.connect()
        .then(() => {
            tran = new mssql.Transaction(conn);
            return tran.begin();
        })
        .then(() => console.log("inicio das transações"))
        .then(() => imprimeTodosRegistros(tran))
        .then(() => console.log("-----------------------------------------"))
        .then(() => insere(tran, "Lucas", "Guaianases"))
        .then(() => console.log("Inserir a ana"))
        .then(() => console.log("-----------------------------------------"))
        .then(() => imprimeTodosRegistros(tran))
        .then(() => console.log("-----------------------------------------"))
        .then(() => tran.commit())
        .then(() => console.log("Deu commit"))
        .then(() => console.log("Terminado a bagaça"))
        .catch(err => console.log(err));
}