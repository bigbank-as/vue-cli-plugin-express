const fs = require('fs')
const encoding = 'utf8'

module.exports = (path, pattern) => {
  const content = fs.readFileSync(path, { encoding })
  const lines = content.split(/\r?\n/g)
  const removed = lines.replace(new RegExp(pattern, 'm'), '')

  fs.writeFileSync(path, removed, { encoding })
}
