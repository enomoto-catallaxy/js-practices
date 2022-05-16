/* 配列を半分に分割して返す */
function splitInHalf(arr){
  var len = arr.length;
  return {
    first: arr.slice(0, len/2),
    last: arr.slice(len/2, len)
  };
}
var arr = [1, 2, 3, 4, 5, 6];
var {first, last} = splitInHalf(arr);
console.log('first : ', first);
console.log('last : ', last);

 //配列の要素番号を取得
const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
console.log(beasts.indexOf('bison'));


const sentences = ['The', 'quick brown fox', 'fox jumps over the lazy dog.'];
const word = 'fox';
for (let i = 0; i < sentences.length; i++) {
  if(sentences[i].includes(word)){
    console.log(sentences[i])
  }
}
