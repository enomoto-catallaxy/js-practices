const today = new Date()
const argv = require('minimist')(process.argv.slice(2))
let month = 0
let year = 0
if (argv.m) {
  month = argv.m
} else {
  month = today.getMonth() + 1
};
if (argv.y) {
  year = argv.y
} else {
  year = today.getFullYear()
};

const FirstDay = new Date(year, month - 1, 1)
const LastDay = new Date(year, month, 0)

const LastDate = LastDay.getDate()
const days = []
for (let i = 0; i < LastDate; i++) {
  days.push(i + 1)
  days[i] = String(days[i])
};

const DayNames = ['日', '月', '火', '水', '木', '金', '土']
console.log('       ' + month + '月 ' + year)
for (let i = 0; i < 7; i++) {
  process.stdout.write(DayNames[i].padStart(2, ' '))
};
console.log()

const eachSlice = (arr, n, result = []) => {
  if (arr.length === 0) {
    return result
  }
  result.push(arr.splice(0, n))
  return eachSlice(arr, n, result)
}
const FirstDayOfWeek = FirstDay.getDay()
const spaces = []
if (FirstDayOfWeek !== 0) {
  for (let i = 0; i < FirstDayOfWeek; i++) {
    spaces[i] = ('  ')
  }
}

const IncludeSpaceInDays = spaces.concat(days)
const SevenDays = eachSlice([...IncludeSpaceInDays], 7)
for (let i = 0; i < SevenDays.length; i++) {
  for (let j = 0; j < SevenDays[i].length; j++) {
    process.stdout.write(SevenDays[i][j].padStart(3, ' '))
  }
  console.log()
}
