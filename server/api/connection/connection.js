const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'tpfinal'
});

mysqlConnection.connect( err =>{
    if(err){
        console.log('Error en db: ', err);
        return;
    } else{
        console.log('Conectado a la base de datos.');
    
    }
});

module.exports = mysqlConnection;