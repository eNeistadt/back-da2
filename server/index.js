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

// Crear la tabla con la sentencia SQL
const crearTabla = `
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  usuario VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol ENUM('legales', 'empleado', 'CEO', 'propietario', 'inquilino', 'mudanzas') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

connection.query(crearTabla, (err, results) => {
  if (err) {
    console.error('Error al crear la tabla:', err.stack);
    return;
  }
  console.log('Tabla creada exitosamente.');
});

// Cerrar la conexión
connection.end();
