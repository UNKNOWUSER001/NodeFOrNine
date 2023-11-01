const mysql = require("mysql2")

const  pool = mysql.createPool({
  host:"localhost",
  user:"root",
  password:"Fluke1234",
  database:"auth",
})

module.exports = pool.promise()