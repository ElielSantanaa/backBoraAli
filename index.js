const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const banco = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "86173064",
  database: "boraali",
});

app.post("/registrar", (req, res) => {
  banco.query(
    "INSERT INTO usu_usuario (Usu_nome, Usu_Email, Usu_Senha) VALUE (?,?,?)",
    [req.body.nome, req.body.email, req.body.senha]
  );
});

app.post("/logar", (req, res) => {
  banco.query(
    "SELECT * FROM  usu_usuario WHERE Usu_Email = ? AND Usu_Senha = ?",
    [req.body.email, req.body.senha],

    (error, result) => {
      if (error) {
        res.send(error);
      }
      res.send(result);
    }
  );
  console.log(res);
});

app.listen(5001, () => {
  console.log("Rodando no grau");
});
