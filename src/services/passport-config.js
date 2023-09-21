const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
// const { default: mongoose } = require('mongoose');
const User = require('../repository/mongodb');
// const RememberMeStrategy  =require('passport-remember-me').Strategy//////////////


function initialize(passport, getUserByEmail, getUserById) {  
  const authenticateUser = async (email, password, done) => {  

    const user = await User.findOne({ email: email });
    if (!user) {
    // const user = getUserByEmail(email)   תזכור את זה צריך להחזיר בולל רטרן במקרה של כישלון את הירוקים
    // if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }  
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })

}
module.exports = initialize