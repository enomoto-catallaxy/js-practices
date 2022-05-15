var sqlite = require('sqlite3').verbose();                                          
var db = new sqlite.Database('test.sqlite');
const Enquirer = require('enquirer');
var AllBodys = [];
var choices = [];

class optionR{
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

  index(){
    this.getBodys().then(rows => {
      rows.forEach(row => {
        AllBodys.push(row);
      })
      const NumberOfObject = Object.keys(AllBodys).length
      for (let i = 0; i < NumberOfObject ; i++) {
        choices[i] = AllBodys[i].body
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
      this.run('SELECT body FROM memos WHERE body = ?', [body]);
    })
  }

  async referBodys(){
    const question = {
      type: 'select',
      name: 'body',
      message: 'Choose a note you want to select:',
      choices: choices
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
      console.log(`${params}`)
    });
  }
}

let option = new optionR;
option.index();