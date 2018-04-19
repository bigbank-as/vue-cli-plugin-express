const fs = require('fs')
const encoding = 'utf8'

module.exports = (code, path, pattern) => {
  let content = fs.readFileSync(path, { encoding })
  const lines = content.split(/\r?\n/g).reverse()
  const lastPatternIndex = lines.findIndex(line => line.match(pattern))

  lines[lastPatternIndex] += code
  content = lines.reverse().join('\n')

  fs.writeFileSync(path, content, { encoding })
}
