const Enquirer = require('enquirer');
const question = {
  type: 'select',
  name: 'body',
  message: 'Choose a note you want to refer:',
};

class optionR {
  getRecords(db) {
    return new Promise((resolve, reject) => {
      db.serialize(() =>{
        db.all("SELECT * FROM bodys", function(err, row) {
          if (err) return reject(err)
          resolve(row)
        })
      })
    })
  }

  async getObjects(db){ //idとbodyを要素に持つオブジェクトを得る
    const objects = [];
    const gottenRecords = await this.getRecords(db);
    gottenRecords.forEach(element => objects.push(element))
    return objects;
  }

  async getBodys(db){ //bodyのみを要素にもつオブジェクトを得る
    let objects = await this.getObjects(db)
    let choices = []
    for (let i = 0; i < Object.keys(objects).length ; i++) {
      choices[i] = objects[i].body
    };
    return choices
  }

  async getAnswers(db){
    let alternatives = await this.getBodys(db);
    let IncludeSpaceBodys = []
    let refernce
    IncludeSpaceBodys = IncludeSpaceBodys.concat(alternatives)
    for (let i = 0; i < alternatives.length; i++) {
      alternatives[i] = alternatives[i].split(' ')[0].split('　')[0]
    };
    question.choices = alternatives;
    const answer = await Enquirer.prompt(question)
    const bodys = alternatives.map((obj) => obj.name)
    const answerId = bodys.indexOf(answer.body)
    console.log (IncludeSpaceBodys[answerId])
    /* for (let i = 0; i < removedLargeSpace.length; i++){
      for (let j = 0; removedAllSpaces.length; j++) {
        let removedAllSpaces = removedLargeSpace[i].split(' ')

        console.log(removedAllSpaces[j])
      }
    } */
  }
}

module.exports = optionR;
