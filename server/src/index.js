//! Log In
//? Libs
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwl = require("jwl");
const bcrypt = require("bcrypt");
const bodyParse = require("body-parser");
const port = 3000;

//? useing the middlewares
const app = express();
app.use(cors());
app.use(bodyParse());
app.use(express.json());

//?create the conexion to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Edel_son_152022",
  database: "login",
});

db.connect((err) => {
  if (err) console.log("Error connexion in the data of base :", err);
  console.log("connexion is runnig");
});

db.on("error", (err) => {
  console.log("Error en la base de datos", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.log("Error in the CONNECTION LOST");
  } else {
    throw err;
  }
});

//! Server

//?Register
app.post("/register", (req, res) => {
  const { name, clave, user } = req.body; //? geting values of the frontend
  const sql =
    "INSERT INTO usuario (nombre,usuario,clave,id_rol) Values (?,?,?,1);"; //? consult sql
  //! creating an hash to password
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(clave.toString(), salt, (err, hash) => {
      if (err) return res.json({ Error: "Error in the hash password" }); //? validate the erros
      const values = [name, user, hash]; //! creating the new values
      console.log(values);
      db.query(sql, values, (err, data) => {
        //? inyeccion sql
        if (err) return res.json({ Error: "Error in the consult" });
        if (data.affectedRows > 0) {
          return res.json({ Status: "Success" });
        } else {
          return res.json({ Error: "ERROR in the consult" });
        }
      });
    });
  });
});

// app.post("/register", (req, res) => {
//   let salt = 10;
//   const { name, clave, user } = req.body; //? geting values of the frontend
//   const sql = "INSERT INTO usuario (nombre,usuario,clave) Values (?,?,?);"; //? consult sql
//   //! creating an hash to password
//   bcrypt.hash(clave.toString(), salt, (err, data) => {
//     if (err) return res.json({ Error: "Error in the hash password" }); //? validate the erros
//     const values = [name, user, data]; //! creating the new values
//     console.log(values);
//     db.query(sql, values, (err) => {
//       //? inyeccion sql
//       if (err) return res.json({ Error: "Error in the consult" });
//       return res.json({ Status: "Success" });
//     });
//   });
// });

//? Login
app.post("/login", (req, res) => {
  console.log(req.body.user, req.body.clave); //? geting values of the frontend
  const sql =
    "SELECT * FROM usuario WHERE usuario = ? and clave = ? and activo = 'activo'"; //? consult sql
  //? creating the inyeccion
  db.query(sql, [req.body.user, req.body.clave], (err, respon) => {
    if (err) return res.json({ Error: "login error in the server" }); // ? validando errores
    if (respon.length > 0) {
      return res.json({ Status: "Success" });
    } else {
      return res.json({ Error: "password no it matched" });
    }
  });
});

app.get("/api", (req, res) => {
  db.query(
    "SELECT * FROM usuario INNER JOIN rol ON usuario.id_rol = rol.id_rol INNER JOIN permisos ON rol.id_permiso = permisos.id_permiso ORDER BY usuario.id ASC;",
    (err, data) => {
      if (err) throw err;
      res.json(data);
    }
  );
});

app.post("/api/editar/:id", (req, res) => {
  res.json({ Status: `http://localhost:3000/${req.param.id}` });
});

app.delete("/api/eliminar/:id", (req, res) => {
  res.json({ Status: `datos Eiminados corecctamente ${req.param.id}` });
});

//! listing the server
app.listen(port, console.log(`listing in the port ${port}`));
