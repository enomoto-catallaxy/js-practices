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

  async allchoices(){
    const gottenBodys = await this.getBodys();
    gottenBodys.forEach(element => {
      choices.push(element)
    })
    const NumberOfObject = Object.keys(choices).length
    for (let i = 0; i < NumberOfObject ; i++) {
      choices[i] = choices[i].body
    };
    return choices;
  }

  async setChoices(){
    const temps = await this.allchoices();
    const question = {
      type: 'select',
      name: 'body',
      message: 'Choose a note you want to delete:',
      choices: temps
    };
    const answer = await Enquirer.prompt(question);
    return answer.body;
  }

  run(sql, params) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  async deleteBodys(){
    const body = await this.setChoices();
    this.run('DELETE FROM memos WHERE body = ?', [body], function(err, row) {
      if (err){
        throw err;
      }
    });
  }
}

module.exports = optionD;
