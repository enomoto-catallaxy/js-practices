var readline = require('readline');
var sqlite = require('sqlite3').verbose();                                          
var db = new sqlite.Database('test.sqlite');

class optionEcho{
  addBodys(){
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(">> Input your new note!   ", function(answer) {
      db.run('CREATE TABLE IF NOT EXISTS memos(body TEXT)');
      var stmt = db.prepare('INSERT INTO memos VALUES(?)');
      stmt.run([answer]);
      rl.close();
    });
  }
}
module.exports = optionEcho;
