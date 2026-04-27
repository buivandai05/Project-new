import { constants } from 'buffer';
import { error } from 'console';
import mysql from 'mysql2/promise';

// Create the connection to database

const getConnection= async()=>{
const connection = await mysql.createConnection({
  port:3306,
  host: 'localhost',
  user: 'root',
  password:'dai123',
  database: 'nodejspro',
});
return connection;
}

export {getConnection};