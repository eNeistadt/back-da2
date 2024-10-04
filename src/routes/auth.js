import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connection } from "../../config/db.js";
import  {sendMail}  from "../middleware/nodemailer.js"; // Importa el servicio de correo

export const authRouter = express.Router();

const JWT_SECRET = `da2`


authRouter.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log(email);
  
    // Verificar que los campos no estén vacíos
    if (!email || !password) {
      return res.status(400).json({ msg: "Por favor complete todos los campos" });
    }
  
    // Consulta para obtener el usuario por el nombre de usuario (email)
    const query = `SELECT * FROM usuarios WHERE usuario = ?`;
    connection.query(query, [email], (err, results) => {
      if (err || results.length === 0) {
        console.log(err);
        return res.status(400).json({ msg: "Usuario no encontrado" });
      }
  
      const user = results[0];
  
      // Verificar si la contraseña es correcta
      if (password !== user.password) {
        return res.status(400).json({ msg: "Contraseña incorrecta" });
      }
  
      const token = jwt.sign(
        { id: user.id, rol: user.rol, username: user.nombre },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
    res.status(200).json({ token, rol: user.rol, username: user.nombre });

      // Si la contraseña es correcta, devolver el rol del usuario
    });
  });
  


authRouter.get('/users', (req, res) => {
  const query = 'SELECT id, nombre, email, rol FROM usuarios';
  connection.query(query, (err, results) => {
      if (err) {
          return res.status(500).json({ msg: "Error al obtener los usuarios" });
      }

      // Enviar la lista de usuarios en formato JSON
      res.status(200).json(results);
  });
});


