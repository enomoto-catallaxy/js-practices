const argv = require('minimist')(process.argv.slice(2))
const sqlite = require('sqlite3').verbose()                                     
const db = new sqlite.Database('memo.sqlite')

const optionEcho = require('./option_echo.js')
const optionL = require('./option_l.js')
const optionR = require('./option_r.js')
const optionD = require('./option_d.js')

if (argv.a) {
  const option = new optionEcho()
  option.addBodys(db)
}

if (argv.l) {
  const option = new optionL()
  option.listBodeys(db)
}

if (argv.r) {
  const option = new optionR()
  option.getAnswers(db)
}

if (argv.d) {
  const option = new optionD()
  option.deleteBodys(db)
}
