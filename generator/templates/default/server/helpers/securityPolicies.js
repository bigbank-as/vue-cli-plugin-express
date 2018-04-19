const self = `'self'`
const unsafeInline = `'unsafe-inline'`
const analytics = '*.google-analytics.com/'
const googleAddress = 'maps.googleapis.com/'
const scripts = [
  '*.googletagmanager.com/',
  analytics,
  googleAddress
]
const images = [
  'data:',
  'blob:',
  analytics
]
// Needed for HotJar if your country uses it
const connect = [
  'ws:',
  'wss:'
]

const securityDirectives = {
  defaultSrc: [self],
  scriptSrc: [self, unsafeInline, ...scripts],
  styleSrc: [self, unsafeInline],
  imgSrc: [self, ...images],
  fontSrc: [self, 'data:'],
  connectSrc: [self, ...connect],
  reportUri: 'https://report-uri.bigbank.eu/csp'
}

if (process.env.NODE_ENV === 'production') {
  securityDirectives.upgradeInsecureRequests = true
}

export default securityDirectives
