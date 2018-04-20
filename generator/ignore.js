const fs = require('fs')
const encoding = 'utf8'

module.exports = (gitignore, pattern) => {
  let content = fs.readFileSync(gitignore, { encoding })
  const lines = content.split(/\r?\n/g).reverse()

  lines.push(pattern)
  content = lines.reverse().join('\n')

  fs.writeFileSync(gitignore, content, { encoding })
}
