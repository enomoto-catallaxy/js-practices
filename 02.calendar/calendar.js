let today = new Date();//月は-1、日は+1が月初め
let firstday = new Date(2022,4,1); // 月は-1、日は２が月初め
let lastday = new Date(2022,5,0); // 月はそのまま、日は0が月末

let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();
let dayofweek = today.getDay();

//当月の初日から末日までの数字配列(String)
let last_date = lastday.getDate();
let dayarrays = [];
for(i = 0; i < last_date; i++){
  dayarrays.push(i+1);
  dayarrays[i] = String(dayarrays[i]);
}
//

//header
const dayname = ['日','月','火','水','木','金','土'];
console.log(month + '月 ' + year);
for(let i=0; i<7; i++){
  process.stdout.write(dayname[i].padStart(2, ' '));
}process.stdout.write("\n");
//

//each_sliceメソッドのようなもの
const eachSlice = (arr, n = 2, result = []) => {
  if (arr.length === 0) {
    return result;
  }
  result.push(arr.splice(0, n))
  return eachSlice(arr, n, result)
}
//

//空白を初日までに追加
let first_dayofweek = firstday.getDay();
let spacearrays = []
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
  }console.log("\n");
}
//
