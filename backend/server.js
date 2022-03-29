let express = require("express")
let app = express()
let db = require("./database")

let bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let HTTP_PORT = 8080

// Inicia o servidor
app.listen(HTTP_PORT, () => {
  console.log(`Servidor rodando na porta ${HTTP_PORT}`)
})

// ROTAS DA API - INICIO
// Retorna uma tarefa
app.get("/tarefas/:id", (req, res, next) => {
  let sql = "select * from tarefa where id = ?"
  let params = [req.params.id]

  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ "erro": err.message })
      return
    }

    if (row) {
      row.completa = row.completa === 1 ? true : false
      res.json(row)
    } else {
      res.status(404).json()
    }
  })
})

// Deleta uma tarefa
app.delete("/tarefas/:id", (req, res, next) => {
  let sql = "delete from tarefa where id = ?"
  let params = [req.params.id]

  db.run(sql, params, (err, result) => {
    if (err) {
      res.status(400).json(({ "erro": err.message }))
      return
    }

    res.status(204).json()
  })
})

// Atualiza uma tarefa
app.patch("/tarefas/:id", (req, res, next) => {
  let data = {
    descricao: req.body.descricao,
    prazo: req.body.prazo,
    completa: req.body.completa && req.body.completa == true ? 1 : 0
  }

  db.run(
    `update tarefa set
      descricao = coalesce(?, descricao),
      prazo = coalesce(?, prazo),
      completa = coalesce(?, completa)
    where id = ?`,
    [data.descricao, data.prazo, data.completa, req.params.id],
    (err, result) => {
      if (err) {
        res.status(400).json({ "erro": err.message })
        return
      }

      res.status(201).json()
    }
  )
})

// Cria uma tarefa
app.post("/tarefas", (req, res, next) => {
  let erros = []

  if (!req.body.descricao) {
    erros.push("Descrição não especificada.")
  }

  if (!req.body.prazo) {
    erros.push("Prazo não especificado.")
  }

  if (!req.body.completa) {
    erros.push("Completa não especificado.")
  }

  if (erros.length) {
    res.status(400).json({ "erros": erros.join(" ") })
    return
  }

  let data = {
    descricao: req.body.descricao,
    prazo: req.body.prazo,
    completa: req.body.completa == true ? 1 : 0
  }

  let sql = 'insert into tarefa (descricao, prazo, completa) values (?, ?, ?)'
  let params = [data.descricao, data.prazo, data.completa]

  db.run(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ "erro": err.message })
      return
    }

    res.status(201).json()
  })
})

// Retorna lista de tarefas
app.get("/tarefas", (req, res, next) => {
  let sql = "select * from tarefa"
  let params = []

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "erro": err.message })
      return
    }

    for (let i = 0; i < rows.length; i++) {
      rows[i].completa = rows[i].completa === 1 ? true : false
    }

    res.json(rows)
  })
})

// ROTAS DA API - FIM

// Rota padrão (default)
app.get("/", (req, res, next) => {
  res.json({"message":"Ok"})
})
