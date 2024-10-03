const mysql = require('mysql2');

// Crea la conexión con tus credenciales
const connection = mysql.createConnection({
    host: "database-1.c7rxooynh95g.us-east-1.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "password",
    database: "my_db"
});

// Conéctate a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos.');
});

connection.query('SELECT * FROM usuarios', (err, results, fields) => {
    if (err) {
      console.error('Error al hacer SELECT:', err.stack);
      return;
    }
    console.table(results);  // Muestra los resultados en formato tabla
  });
// Cerrar la conexión
connection.end();