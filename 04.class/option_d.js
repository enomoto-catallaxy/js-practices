const Enquirer = require('enquirer')
const question = {
  type: 'select',
  name: 'body',
  message: 'Choose a note you want to delete:'
}

class OptionD {
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

  async getChoices (db) {
    const choices = []
    const gottenRecords = await this.getRecords(db)
    gottenRecords.forEach(element => choices.push(element))
    for (let i = 0; i < Object.keys(choices).length; i++) {
      choices[i] = choices[i].body
    }
    return choices
  }

  async deleteBodys (db) {
    const alternatives = await this.getChoices(db)
    let IncludeSpaceBodys = []
    let body
    IncludeSpaceBodys = IncludeSpaceBodys.concat(alternatives)
    for (let i = 0; i < alternatives.length; i++) {
      alternatives[i] = alternatives[i].split(' ')[0].split('　')[0]
    }
    question.choices = alternatives
    const answer = await Enquirer.prompt(question)
    for (let i = 0; i < IncludeSpaceBodys.length; i++) {
      if (IncludeSpaceBodys[i].includes(answer.body)) {
        body = IncludeSpaceBodys[i]
        break
      }
    }
    this.run('DELETE FROM memos WHERE body = ?', [body], db)
  }

  run (sql, params, db) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, (err) => {
        if (err) reject(err)
        resolve()
      })
    })
  }
}

module.exports = OptionD
