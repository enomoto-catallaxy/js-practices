var readline = require('readline');

class optionEcho{
  addBodys(db){
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(">> Input your new note!   ", function(answer) {
      db.run('CREATE TABLE IF NOT EXISTS bodys(id INTEGER PRIMARY KEY AUTOINCREMENT, body TEXT NOT NULL)');
      db.run('INSERT INTO bodys(body) VALUES(?)', [answer]);
      rl.close();
    });
  }
}
module.exports = optionEcho;
