let sqlite3 = require('sqlite3').verbose()

const DBOSURCE = "db.sqlite"

let db = new sqlite3.Database(DBOSURCE, (err) => {
  if (err) {
    // Não foi possível abrir o BD
    console.log(err.message)
    throw err
  } else {
    console.log("Conectado ao banco de dados SQLite3")

    db.run(`CREATE TABLE tarefa (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT,
      prazo TEXT,
      completa INTEGER
    )`, (err) => {
      if (err) {
        // Tabela já criada
      } else {
        // Tabela já criada, adiciona algumas linhas
        let insert = 'INSERT INTO tarefa (descricao, prazo, completa) VALUES (?, ?, ?)'
        db.run(insert, ["Escrever relatório de vendas", "2016-08-29T09:12:33.001Z", 1])
        db.run(insert, ["Buscar roupa na lavanderia", "2021-03-30T02:10:21.729Z", 0])
        db.run(insert, ["Fazer apresentacao do trablaho", "2021-04-03T09:12:33.001Z", 1])
      }
    })
  }
})

module.exports = db
