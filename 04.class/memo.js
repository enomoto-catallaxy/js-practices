const argv = require('minimist')(process.argv.slice(2))
const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('memo.sqlite')

const OptionEcho = require('./option_echo.js')
const OptionL = require('./option_l.js')
const OptionR = require('./option_r.js')
const OptionD = require('./option_d.js')

if (argv.a) {
  const option = new OptionEcho()
  option.addBodys(db)
}

if (argv.l) {
  const option = new OptionL()
  option.listBodeys(db)
}

if (argv.r) {
  const option = new OptionR()
  option.getAnswers(db)
}

if (argv.d) {
  const option = new OptionD()
  option.deleteBodys(db)
}
