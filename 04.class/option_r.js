var sqlite = require('sqlite3').verbose();                                          
var db = new sqlite.Database('test.sqlite');
const Enquirer = require('enquirer');
const choices = [];

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

  allchoices(){
    this.getBodys().then(rows => {
      return new Promise((resolve) => {
        rows.forEach(row => {
          choices.push(row);
        })
        const NumberOfObject = Object.keys(choices).length
        for (let i = 0; i < NumberOfObject ; i++) {
          choices[i] = choices[i].body
        };
        resolve(choices);
      })
    })
  }

  setChoices(){
    this.allchoices().then(row => {
        return new Promise((resolve) => {
          const question = {
            type: 'select',
            name: 'body',
            message: 'Choose a note you want to select:',
            choices: row
          };
          resolve(Enquirer.prompt(question));
        })
      }
    )
  }

  referBodys(){
    this.setChoices().then(row => {
      const answer = row
      const body = answer.body
      this.run('SELECT body FROM memos WHERE body = ?', [body]);
    })
  }

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
option.referBodys();