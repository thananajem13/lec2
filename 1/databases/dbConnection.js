
let mysql = require('mysql2');
let q = mysql.createConnection({
    database:"crudops",
    password:"",
    user:"root",
    host:"localhost"
});
module.exports = q