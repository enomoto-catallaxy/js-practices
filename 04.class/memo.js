const argv = require('minimist')(process.argv.slice(2));
var sqlite = require('sqlite3').verbose();                                          
var db = new sqlite.Database('idtest2.sqlite');

const optionEcho = require('./option_echo.js')
const optionL = require('./option_l.js')
const optionR = require('./option_r.js')
const optionD = require('./option_d.js')


if(argv.a){
  const option = new optionEcho();
  option.addBodys();
}

if(argv.l){
  const option = new optionL();
  option.listBodeys();
}

if(argv.r){
  const option = new optionR();
  option.choiceIndex();//idカラムが出力されない
}

if(argv.d){
  const option = new optionD();
  option.deleteBodys();
}
