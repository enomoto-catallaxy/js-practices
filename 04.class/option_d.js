var sqlite = require('sqlite3').verbose();                                          
var db = new sqlite.Database('idtest2.sqlite');
const Enquirer = require('enquirer');
const question = {
  type: 'select',
  name: 'body',
  message: 'Choose a note you want to delete:',
};

class optionD {
  getRecords() {
    return new Promise((resolve, reject) => {
      db.serialize(() =>{
        db.all("SELECT * FROM bodys", function(err, row) {
          if (err) return reject(err)
          resolve(row)
        })
      })
    })
  }

  async getChoices(){
    const choices = [];
    const gottenRecords = await this.getRecords();
    gottenRecords.forEach(element => choices.push(element))
    for (let i = 0; i < Object.keys(choices).length ; i++) {
      choices[i] = choices[i].body
    };
    return choices;
  }

  async deleteBodys(){
    let alternatives = await this.getChoices();
    let IncludeSpaceBodys = []
    let body
    IncludeSpaceBodys = IncludeSpaceBodys.concat(alternatives)
    for (let i = 0; i < alternatives.length ; i++) {
      alternatives[i] = alternatives[i].split(' ')[0].split('　')[0]
    };
    question.choices = alternatives;
    const answer = await Enquirer.prompt(question);
    for (let i = 0; i < IncludeSpaceBodys.length; i++) {
      if(IncludeSpaceBodys[i].includes(answer.body)){
        body = IncludeSpaceBodys[i];
        break;
      }
    }
    this.run('DELETE FROM bodys WHERE body = ?', [body]);
  }

  run(sql, params) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }
}

module.exports = optionD;
