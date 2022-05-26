const Enquirer = require('enquirer')
const question = {
  type: 'select',
  name: 'body',
  message: 'Choose a note you want to refer:'
}

class OptionR {
  getRecords (db) {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.all('SELECT * FROM memos', function (err, row) {
          if (err) return reject(err)
          resolve(row)
        })
      })
    })
  }

  async getObjects (db) {
    const objects = []
    const gottenRecords = await this.getRecords(db)
    gottenRecords.forEach(element => objects.push(element))
    return objects
  }

  async getBodys (db) {
    const objects = await this.getObjects(db)
    const choices = []
    for (let i = 0; i < Object.keys(objects).length; i++) {
      choices[i] = objects[i].body
    }
    return choices
  }

  async getAnswers (db) {
    const alternatives = await this.getBodys(db)
    let includeSpaceBodys = []
    includeSpaceBodys = includeSpaceBodys.concat(alternatives)
    for (let i = 0; i < alternatives.length; i++) {
      alternatives[i] = alternatives[i].split(' ')[0].split('　')[0]
    }
    question.choices = alternatives
    const answer = await Enquirer.prompt(question)
    const bodys = alternatives.map((obj) => obj.name)
    const answerId = bodys.indexOf(answer.body)
    const reference = includeSpaceBodys[answerId]
    const removedLargeSpaces = reference.split('　')
    const removedAllSpaces = []
    for (let i = 0; i < removedLargeSpaces.length; i++) {
      removedAllSpaces[i] = []
      removedAllSpaces[i] = removedLargeSpaces[i].split(' ')
      for (let j = 0; j < removedAllSpaces[i].length; j++) {
        console.log(removedAllSpaces[i][j])
      }
    }
  }
}

module.exports = OptionR
