var sqlite = require('sqlite3').verbose();                                          
var db = new sqlite.Database('test.sqlite');
const Enquirer = require('enquirer');
const choices = [];

class optionD {
  getBodys() {
    return new Promise((resolve, reject) => {
      db.serialize(() =>{
        db.all("SELECT * FROM memos", function(err, row) {
          if (err) return reject(err)
          resolve(row)
        })
      })
    })
  }
  run(sql, params) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  deleteBodys() {
    this.getBodys().then(rows => {
      rows.forEach(row => {
        choices.push(row);
      })
      const NumberOfObject = Object.keys(choices).length
      for (let i = 0; i < NumberOfObject ; i++) {
        choices[i] = choices[i].body
      };
      return choices;
    }).then((choices) => {
      const question = {
        type: 'select',
        name: 'body',
        message: 'Choose a note you want to select:',
        choices: choices
      };
      const answer = Enquirer.prompt(question);
      const body = answer.body;
      this.run('DELETE FROM memos WHERE body = ?', [body]);
    })
  }
}

let option = new optionD;
option.deleteBodys();