
const Enquirer = require('enquirer');
var argv = require('minimist')(process.argv.slice(2));

var sqlite = require('sqlite3').verbose();                                          
var db = new sqlite.Database('test.sqlite');

db.serialize(function() {

  // テーブルがなければ作成
  db.run('CREATE TABLE IF NOT EXISTS memos(body TEXT)');

  if(argv.a){
    // プリペアードステートメントでデータ挿入
    var stmt = db.prepare('INSERT INTO memos VALUES(?)');
    stmt.run(["メモ１"]);
    stmt.run(["今日の日記"]);
    stmt.run(["晩ご飯のレシピ"]);
    stmt.finalize();
  }
  if(argv.r){
    async function Rmemofunc(){
      const question = {
        type: 'select',
        name: 'body',
        message: 'Choose a note you want to see:',
        choices: ['メモ１', '今日の日記', '晩ご飯のレシピ'],
      };
      const answer = await Enquirer.prompt(question);
      var body = answer.body;
      return body;
    };
    Rmemofunc().then(value => {
      let body = value;
      db.get("SELECT body FROM memos WHERE body = ?", [body], function(err, row) {
        if (err) {
          throw err;
        }
        console.log(row.body);
      });
    })
  };
  if(argv.l){
    db.each("SELECT * FROM memos", function(err, row) {
      if (err) {
        throw err;
      }
      console.log(row.body);
    });
  }
  
});

db.close();
if(argv.d){

  async function Dmemofunc(){
    const question = {
      type: 'select',
      name: 'body',
      message: 'Choose a note you want to delete:',
      choices: ['メモ１', '今日の日記', '晩ご飯のレシピ'],
    };
    const answer = await Enquirer.prompt(question);
    const body = answer.body;
    run('DELETE FROM memos WHERE body = ?', [body]);
  };

  function run(sql, params) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err);
        resolve();
      });
      console.log(params)
    });
  }

  Dmemofunc();
};
