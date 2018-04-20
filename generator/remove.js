const fs = require('fs')
const encoding = 'utf8'

module.exports = (path, pattern) => {
  let content = fs.readFileSync(path, { encoding })
  const lines = content.split(/\r?\n/g)
  const removed = lines.filter(line => !line.match(pattern))
  content = removed.join('\n')

  fs.writeFileSync(path, content, { encoding })
}
