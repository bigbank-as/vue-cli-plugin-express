/* eslint-disable no-undef */
import csp from 'helmet-csp'
import path from 'path'
import helmet from 'helmet'
import logger from 'node-log-common'
import express from 'express'
import Session from 'express-session'
import compress from 'compression'
import bodyParser from 'body-parser'
import SessionStore from 'session-file-store'
import directives from './helpers/securityPolicies'

const dev  = process.env.NODE_ENV != 'production'
const port = process.env.PORT || 4000
const app = express()
const indexPath = dev ? 'public' : 'dist'
const index = path.join(__dirname, '..', indexPath, 'index.html')
const sessionStore = new SessionStore(Session)
const FileStore = new sessionStore({
  logFn: () => {} // suppress useless logs
})

/**
 * Configure HTTP headers and enable GZip
 */
app.use(compress())
app.use(helmet())
app.use(csp({ directives }))

if (!dev) {
  const oneYearInSeconds = 31536000

  app.use(helmet.hsts({
    maxAge: oneYearInSeconds
  }))
}

{
  const uploadLimit = process.env.FORMATTED_UPLOAD_LIMIT || '20MB'

  app.use(bodyParser.json({ uploadLimit }))
  app.use(express.static(__dirname))
  app.use(express.static(path.join(__dirname, '..', 'public'), { maxage: '1h' }))
  app.use(express.static(path.join(__dirname, '..', 'dist'), { maxage: '12h' }))
  app.use(express.static(path.join(__dirname, '..', 'node_modules', 'bigbank-interface-components', 'dist'), { maxage: '12h' }))
}

{
  // Set up requests session
  const expirationPromptDuration = (process.env.EXPIRATION_PROMPT_DURATION || 30) * 1000
  const maxAge = (process.env.SESSION_TIMEOUT || 3 * 60 * 1000) + parseInt(expirationPromptDuration, 10)
  const session = Session({
    store: FileStore,
    secret: process.env.COOKIE_SECRET || 'c00k1es3cr3t',
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: { maxAge },
  })
  app.use(session)
}

app.get('/', (req, res) => {
  res.sendFile(index)
})
app.get('/status/technical-error', (req, res) => {
  res.status(500).sendFile(index)
})

// Simple middleware to debug session timeouts
// TODO: Disallow all requests without session for the routes defined below
app.use(function(req, res, next) {
  logger.debug('Requesting:', req.path)

  if (!req.session) {
    logger.debug('Session expired!')
    res.redirect('/')
  } else {
    logger.debug('Session expires in: ' + (req.session.cookie.maxAge / 1000) + 's')
  }

  next()
})

// #|middleware|#

// Handle all other routes Vue-side
app.get('*', (req, res) => {
  res.sendFile(index)
})

const server = app.listen(port, () => {
  logger.log('info', 'Application listening on port: ' + port)
  logger.log('info', 'Application mode: ' + (dev ? 'DEVELOPMENT' : 'PRODUCTION'))
})

export default server
