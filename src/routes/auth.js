import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connection } from "../../config/db.js";


export const authRouter = express.Router();

const JWT_SECRET = `da2`


authRouter.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log(email);
  

    if (!email || !password) {
      return res.status(400).json({ msg: "Por favor complete todos los campos" });
    }
  

    const query = `SELECT * FROM usuarios WHERE usuario = ?`;
    connection.query(query, [email], (err, results) => {
      if (err || results.length === 0) {
        console.log(err);
        return res.status(400).json({ msg: "Usuario no encontrado" });
      }
  
      const user = results[0];
  

      if (password !== user.password) {
        return res.status(400).json({ msg: "Contraseña incorrecta" });
      }
  
      const token = jwt.sign(
        { id: user.id, rol: user.rol, username: user.nombre },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
    res.status(200).json({ token, rol: user.rol, username: user.nombre });


    });
  });
  


authRouter.get('/users', (req, res) => {
  const query = 'SELECT id, nombre, email, rol FROM usuarios';
  connection.query(query, (err, results) => {
      if (err) {
          return res.status(500).json({ msg: "Error al obtener los usuarios" });
      }


      res.status(200).json(results);
  });
});


