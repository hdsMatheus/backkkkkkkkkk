const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;
const segredoJWT = "seuSegredoSuperSecreto";

app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "acesso123",
  database: "santa",
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.stack);
    return;
  }
  console.log("Conectado ao banco de dados como ID", connection.threadId);
});

// Rota para cadastrar um usuário
app.post("/cadastrar", (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({
      mensagem: "Informe nome, email e senha para cadastrar um usuário.",
    });
  }

  const cadastrarUsuarioQuery =
    "INSERT INTO dados (nome, email, senha) VALUES (?, ?, ?)";
  connection.query(
    cadastrarUsuarioQuery,
    [nome, email, senha],
    (err, resultado) => {
      if (err) {
        console.error("Erro ao cadastrar usuário:", err);
        return res.status(500).json({
          mensagem: "Erro interno do servidor ao cadastrar usuário.",
          error: err.message,
        });
      }

      res.json({
        mensagem: "Usuário cadastrado com sucesso!",
        id: resultado.insertId,
      });
    }
  );
});

app.post("/autenticar", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Informe o e-mail e a senha para autenticação." });
  }

  const autenticarUsuarioQuery =
    "SELECT * FROM dados WHERE email = ? AND senha = ?";
  connection.query(
    autenticarUsuarioQuery,
    [email, senha],
    (err, resultados) => {
      if (err) {
        console.error("Erro ao autenticar usuário:", err);
        return res.status(500).json({
          mensagem: "Erro interno do servidor ao autenticar usuário.",
        });
      }

      if (resultados.length === 0) {
        return res
          .status(401)
          .json({ mensagem: "Credenciais inválidas. Usuário não encontrado." });
      }

      const usuarioAutenticado = resultados[0];

      const token = jwt.sign(
        { id: usuarioAutenticado.id, email: usuarioAutenticado.email },
        segredoJWT,
        { expiresIn: "1h" }
      );

      res.json({ mensagem: "Usuário autenticado com sucesso!", token });
    }
  );
});

app.get("/obterProdutos", (req, res) => {
  const obterProdutosQuery = "SELECT * FROM produtos";

  connection.query(obterProdutosQuery, (err, resultados) => {
    if (err) {
      console.error("Erro ao obter produtos:", err);
      return res.status(500).json({
        mensagem: "Erro interno do servidor ao obter produtos.",
        error: err.message,
      });
    }

    res.json(resultados);
  });
});

app.get("/obterProdutos", (req, res) => {
  const obterProdutosQuery = "SELECT * FROM produtos";

  connection.query(obterProdutosQuery, (err, resultados) => {
    if (err) {
      console.error("Erro ao obter produtos:", err);
      return res.status(500).json({
        mensagem: "Erro interno do servidor ao obter produtos.",
        error: err.message,
      });
    }

    res.json(resultados);
  });
});

app.get("/obterProdutos", (req, res) => {
  const obterProdutosQuery = "SELECT * FROM produtos";

  connection.query(obterProdutosQuery, (err, resultados) => {
    if (err) {
      console.error("Erro ao obter produtos:", err);
      return res.status(500).json({
        mensagem: "Erro interno do servidor ao obter produtos.",
        error: err.message,
      });
    }

    res.json(resultados);
  });
});

app.get("/obteropen", (req, res) => {
  const obterProdutosQuery = "SELECT * FROM produtos WHERE category = 'open'";

  connection.query(obterProdutosQuery, (err, resultados) => {
    if (err) {
      console.error("Erro ao obter produtos:", err);
      return res.status(500).json({
        mensagem: "Erro interno do servidor ao obter produtos.",
        error: err.message,
      });
    }
    console.log(res.json(resultados));
    res.json(resultados);
  });
});
app.get("/obterplata", (req, res) => {
  const obterProdutosQuery =
    "SELECT * FROM produtos WHERE categoty = 'plataforma'";

  connection.query(obterProdutosQuery, (err, resultados) => {
    if (err) {
      console.error("Erro ao obter produtos:", err);
      return res.status(500).json({
        mensagem: "Erro interno do servidor ao obter produtos.",
        error: err.message,
      });
    }

    res.json(resultados);
  });
});
app.get("/obterrpg", (req, res) => {
  const obterProdutosQuery = "SELECT * FROM produtos WHERE category = 'rpg'";

  connection.query(obterProdutosQuery, (err, resultados) => {
    if (err) {
      console.error("Erro ao obter produtos:", err);
      return res.status(500).json({
        mensagem: "Erro interno do servidor ao obter produtos.",
        error: err.message,
      });
    }

    res.json(resultados);
  });
});
app.get("/oi", async (req, res) => {
  res.sendfile(path.join(__dirname, "teste.html"));
});

app.get("/registrar", async (req, res) => {
  res.sendfile(path.join(__dirname, "reg.html"));
});

app.get("/entrar", async (req, res) => {
  res.sendfile(path.join(__dirname, "entrar.html"));
});

app.get("/1", async (req, res) => {
  res.sendfile(path.join(__dirname, "/1.html"));
});

app.get("/2", async (req, res) => {
  res.sendfile(path.join(__dirname, "/2.html"));
});

app.get("/3", async (req, res) => {
  res.sendfile(path.join(__dirname, "/3.html"));
});

app.get("/4", async (req, res) => {
  res.sendfile(path.join(__dirname, "4.html"));
});

app.get("/5", async (req, res) => {
  res.sendfile(path.join(__dirname, "5.html"));
});

app.get("/6", async (req, res) => {
  res.sendfile(path.join(__dirname, "6.html"));
});

app.get("/7", async (req, res) => {
  res.sendfile(path.join(__dirname, "7.html"));
});

app.get("/8", async (req, res) => {
  res.sendfile(path.join(__dirname, "8.html"));
});

app.get("/9", async (req, res) => {
  res.sendfile(path.join(__dirname, "9.html"));
});

app.get("/10", async (req, res) => {
  res.sendfile(path.join(__dirname, "10.html"));
});

app.get("/11", async (req, res) => {
  res.sendfile(path.join(__dirname, "11.html"));
});

app.get("/12", async (req, res) => {
  res.sendfile(path.join(__dirname, "12.html"));
});

app.get("/13", async (req, res) => {
  res.sendfile(path.join(__dirname, "13.html"));
});

app.get("/15", async (req, res) => {
  res.sendfile(path.join(__dirname, "15.html"));
});

app.get("/16", async (req, res) => {
  res.sendfile(path.join(__dirname, "16.html"));
});

app.get("/17", async (req, res) => {
  res.sendfile(path.join(__dirname, "17.html"));
});

app.get("/18", async (req, res) => {
  res.sendfile(path.join(__dirname, "18.html"));
});

app.get("/19", async (req, res) => {
  res.sendfile(path.join(__dirname, "19.html"));
});
app.get("/20", async (req, res) => {
  res.sendfile(path.join(__dirname, "20.html"));
});
app.get("/21", async (req, res) => {
  res.sendfile(path.join(__dirname, "21.html"));
});
app.get("/21", async (req, res) => {
  res.sendfile(path.join(__dirname, "/22.html"));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:5500`);
});
