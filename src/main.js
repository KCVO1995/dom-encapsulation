const div = dom.find('.red', test)[0]
console.log(div)
dom.style(x, 'color', 'blue')

console.log(dom.style(x, { color: 'green' }))

const divList = dom.find('.red') // 获取多个 div.red 元素
dom.each(divList, (n) => console.log(n)) // 遍历 divList 里的所有元素