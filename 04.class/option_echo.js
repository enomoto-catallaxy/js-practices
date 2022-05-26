const readline = require('readline')

class OptionEcho {
  addBodys (db) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    rl.question('>> Input your new note!   ', function (answer) {
      db.run('INSERT INTO memos(body) VALUES(?)', [answer])
      rl.close()
    })
  }
}
module.exports = OptionEcho
