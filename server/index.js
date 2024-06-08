const express = require("express");
const app = express();
const app2 = express();
const mysql = require('mysql2');//isso pegara a versão mais atual do mysql que instalamos
const cors = require("cors")

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"crudreact",

})

app.use(cors());
app.use(express.json());

app.post("/register",(req, res)=>{
   const {nomeProduto} = req.body;
   const {valor} = req.body;
   const {dataVenda} =req.body;

   let SQL = "INSERT INTO produtos(nomeProduto,valor,dataVenda) VALUES (?,?,?)";

   db.query(SQL,[nomeProduto,valor,dataVenda],(err, result)=>{
        console.log(err);

   })
});
app.get("/listar", (req, res) => {
    let SQL = "SELECT * FROM produtos";

    db.query(SQL, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao listar produtos" });
        } else {
            res.json(result); // Enviar os dados dos produtos como resposta
        }
    });
});
app.delete("/excluir/:id", (req, res) => {
    const produtoId = req.params.id;
  
    // Execute uma consulta SQL para excluir o produto com base no ID
    const SQL = "DELETE FROM produtos WHERE id = ?";
    db.query(SQL, [produtoId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao excluir produto" });
      } else {
        res.json({ message: "Produto excluído com sucesso" });
      }
    });
  });
  app.put("/editar/:id", (req, res) => {
    const produtoId = req.params.id;
    const { nomeProduto, valor, dataVenda } = req.body;
  
    // Execute uma consulta SQL para atualizar os dados do produto com base no ID
    const SQL = "UPDATE produtos SET nomeProduto = ?, valor = ?, dataVenda = ? WHERE id = ?";
    db.query(SQL, [nomeProduto, valor, dataVenda, produtoId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao editar produto" });
      } else {
        res.json({ message: "Produto editado com sucesso" });
      }
    });
  });  
app.listen(3001,()=>{
    console.log("rodando servidor");
});


