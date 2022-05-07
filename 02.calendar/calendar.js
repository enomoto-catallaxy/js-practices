let today = new Date();
var argv = require('minimist')(process.argv.slice(2));
if(argv.m){
  month = argv.m;
}else{
  month = today.getMonth() + 1;
}
if(argv.y){
  year = argv.y;
}else{
  year = today.getFullYear();
}
let firstday = new Date(year, month - 1, 1); 
let lastday = new Date(year, month, 0);

let last_date = lastday.getDate();
let dayarrays = [];
for(i = 0; i < last_date; i++){
  dayarrays.push(i + 1);
  dayarrays[i] = String(dayarrays[i]);
}

const dayname = ['日','月','火','水','木','金','土'];
console.log('       ' + month + '月 ' + year);
for(let i = 0; i < 7; i++){
  process.stdout.write(dayname[i].padStart(2, ' '));
}console.log();

const eachSlice = (arr, n = 2, result = []) => {
  if (arr.length === 0) {
    return result;
  }
  result.push(arr.splice(0, n))
  return eachSlice(arr, n, result)
}

let first_dayofweek = firstday.getDay();
let spacearrays = [];
if(first_dayofweek != 0){
  for(let i = 0; i < first_dayofweek; i++){
    spacearrays[i] = ('  ');
  }
}

let space_dayarrays = spacearrays.concat(dayarrays);
let oneweekarrays = eachSlice([...space_dayarrays],7);
for(let i = 0; i < oneweekarrays.length; i++){
  for(let j = 0; j < oneweekarrays[i].length; j++){
    process.stdout.write(oneweekarrays[i][j].padStart(3, ' '));
  }console.log();
}
