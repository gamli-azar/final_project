
const ROUTER = require('../router/index')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const server = express()

server.set('view-engine', 'ejs')
server.use('firstRouter', ROUTER)

server.use(express.urlencoded({ extended: false }))
server.use(flash())
server.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
server.use(passport.initialize())
server.use(passport.session())
server.use(methodOverride('_method'))

module.exports = server