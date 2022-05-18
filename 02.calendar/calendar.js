const today = new Date()
const argv = require('minimist')(process.argv.slice(2))
let month = 0
let year = 0
if (argv.m) {
  month = argv.m
} else {
  month = today.getMonth() + 1
}
if (argv.y) {
  year = argv.y
} else {
  year = today.getFullYear()
}

const firstDay = new Date(year, month - 1, 1)
const lastDay = new Date(year, month, 0)

const lastDate = lastDay.getDate()
const days = []
for (let i = 0; i < lastDate; i++) {
  days.push(i + 1)
  days[i] = String(days[i])
}

const dayNames = ['日', '月', '火', '水', '木', '金', '土']
console.log('       ' + month + '月 ' + year)
for (let i = 0; i < 7; i++) {
  process.stdout.write(dayNames[i].padStart(2, ' '))
}
console.log()

const eachSlice = (arr, n, result = []) => {
  if (arr.length === 0) {
    return result
  }
  result.push(arr.splice(0, n))
  return eachSlice(arr, n, result)
}
const firstDayOfWeek = firstDay.getDay()
const spaces = []
if (firstDayOfWeek !== 0) {
  for (let i = 0; i < firstDayOfWeek; i++) {
    spaces[i] = ('  ')
  }
}

const includeSpaceInDays = spaces.concat(days)
const sevenDays = eachSlice([...includeSpaceInDays], 7)
for (let i = 0; i < sevenDays.length; i++) {
  for (let j = 0; j < sevenDays[i].length; j++) {
    process.stdout.write(sevenDays[i][j].padStart(3, ' '))
  }
  console.log()
}
