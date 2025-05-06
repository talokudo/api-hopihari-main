const mysql2 = require('mysql2/promise');

// Cria um pool de conexões (forma correta e segura)
const pool = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  port: 3307,
  database: "hopi_hari_db",
});

exports.execute = (query, params = [], connection = pool) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, results) => {
        if (err){
             reject(err);
        }
        else {
            resolve(results);
        }
    });
 });
}