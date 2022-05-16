var sqlite = require('sqlite3').verbose();                                          
var db = new sqlite.Database('idtest2.sqlite');
const Enquirer = require('enquirer');
const choices = [];

class optionR{
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

  async returnRecords(){ //レコードを要素に持つ配列を返す
    const records = await this.getRecords();
    const newRecords = [];
    records.forEach(element => {
      newRecords.push(element)
    })
    return newRecords;
  }

  async allchoices(){ //choicesとして各レコードのbodyカラムのみの配列を返す
    const gottenRecords = await this.getRecords();
    gottenRecords.forEach(element => {
      choices.push(element)
    })
    const NumberOfObject = Object.keys(choices).length
    for (let i = 0; i < NumberOfObject ; i++) {
      choices[i] = choices[i].body
    };
    return choices;
  }

  async choiceIndex(){ // choicesのindexが欲しい
    let RecordTemps = await this.returnRecords();
    let BodyTemps = await this.allchoices();
    for (let i = 0; i < BodyTemps.length ; i++) {
      BodyTemps[i] = BodyTemps[i].split(' ')[0]
    };
    const question = {
      type: 'select',
      name: 'body',
      message: 'Choose a note you want to select:',
      choices: BodyTemps
    };
    const answer = await Enquirer.prompt(question);
    const tempIndex = answer.id;
    console.log(answer)
  }

  async setChoices(){
    const bodys = await this.allchoices();
    const tempIndex = await this.choiceIndex();
    const body = bodys[tempIndex]
    return body
  }

  async referBodys(){
    const body = await this.setChoices();
    this.run('SELECT body FROM bodys WHERE body = ?', [body]);
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

module.exports = optionR;
