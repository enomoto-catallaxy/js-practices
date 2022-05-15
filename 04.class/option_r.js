var sqlite = require('sqlite3').verbose();                                          
var db = new sqlite.Database('test.sqlite');
const Enquirer = require('enquirer');
var allBodys = ["togo", "enomoto", "block"]

class optionR{
  index(){ //すべてのメモをreferBodys()のchoicesに格納させたい
    db.each("SELECT * FROM memos", function(err, row) {
      if (err) {
        throw err;
      }
      return row.body
    });
  }

  async referBodys(){
    const question = {
      type: 'select',
      name: 'body',
      message: 'Choose a note you want to select:',
      choices: allBodys
    };
    const answer = await Enquirer.prompt(question);
    const body = answer.body;
    this.run('SELECT body FROM memos WHERE body = ?', [body]);
  };

  run(sql, params) {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err) => {
        if (err) reject(err);
        resolve();
      });
      console.log(params)
    });
  }
}

let option = new optionR;
allBodys[0] = option.index()
option.referBodys();