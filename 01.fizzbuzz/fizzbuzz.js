let x = 20;

for(let number = 1; number <= x; number++ ){
  if(number % 15 == 0){
    console.log("FizzBuzz");
  }if(number % 5 == 0){
    console.log("Buzz");
  }if(number % 3 == 0){
    console.log("Fizz");
  }else{
  console.log(number);
  }
}
