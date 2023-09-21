if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const User = require('./mongodb')////////
const mongoose =require('mongoose')
const  routs=require('./Routs/Roeter')

// initializePassport(
//   passport,
//   async email => {
//     try {
//       const user = await User.findOne({ email: email });
//       return user;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   },
//   async id => {
//     try {
//       const user = await User.findById(id);
//       return user;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   }
// );

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => User.findOne({ email: email }),
  id => User.findById(id)
  // email => users.find(user => user.email === email),תזכור את זה צריך להחזיר  והחליף בשתי שורות למעלה
  // id => users.find(user => user.id === id)
)
// const users = []
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))



app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
})
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})
app.post('/login',  checkNotAuthenticated,  passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true 
  }  )
  )
app.get('/register', checkNotAuthenticated,  (req, res) => {
  res.render('register.ejs')    
})
app.post('/register', checkNotAuthenticated, async(req, res) => {
  try {
    // בדיקה אם האימייל כבר קיים במערכת
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
    // return  res.status(400).render('indexx.ejs')   זה עבד טוב רק צריך ליצור קובץ בשם הז  בviews
      // אם האימייל כבר קיים, תחזיר שגיאה
      return res.status(400).send('האימייל כבר קיים במערכת')
      // return res.redirect('/').send('no no no no  ')
      ;}
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    console.log(hashedPassword);
    // const data = {
    //           id: Date.now().toString(),
    //           name: req.body.name,       תזכור את זה צריך להחזיר  כולל מה שבאמצע ולקפל במשולש
    //           email: req.body.email,
    //           password: hashedPassword
    //       } 
    //       await collection.insertMany([data])
    // const confirmationToken = generateUniqueToken(); ////////////////////אלה חדשים  שים לב
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      // confirmationToken: confirmationToken ///////////////////////////////אלה חדשים  שים לב
    });
    // if(  newUser ==newUser ){res.send('nono no no');}
    //   //  req.body.email || hashedPassword  
    // // console.log(newUser);

    await newUser.save();
    // sendConfirmationEmail(newUser);//////////////////////////////אלה חדשים  שים לב
    // sendConfirmationEmail(req.body.email, confirmationToken);////////////

    res.status(201).send('הרשמתך בוצעה בהצלחה!');
    ///////////////////////////////////////
    // const newUser = new User({
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: hashedPassword
    // });
    // await newUser.save();



    // users.push({
    //   id: Date.now().toString(),
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: hashedPassword
    // })
    res.redirect('/login')
  } catch {
    // res.redirect('/register')
  }
})
///////////////////////////////////////////
// app.delete('/logout', (req, res) => {
//   req.logOut()
//   res.redirect('/login')
// })
// app.get('/login/admin', checkAuthenticated, (req, res) => {
//   if (req.body.email == 'admin@a') {
//   res.send(',,,,,bbbbbbbbb')
//   // res.render('admin.ejs');
// } else {
//   // res.redirect('/');
// }
// });
///////////////////////////////////////////
app.delete('/logout', function(req, res, next) {
  req.logout(function(err) {  // do this
    if (err) { return next(err); }// do this
    res.redirect('/login');
  });
});
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
  }
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

app.listen(3000
  ,(console.log(11111)))



































// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config()
//   }
  
//   const express = require('express')
//   const app = express()
//   const bcrypt = require('bcrypt')
//   const passport = require('passport')
//   const flash = require('express-flash')
//   const session = require('express-session')
//   const methodOverride = require('method-override')
//   // const {collection} = require('./mongodb')
//   const jwt = require('jsonwebtoken');

// //  // יצירת טוקן JWT
// //   const payload = { userId: 1234, username: 'john_doe' };
// //   const secretKey = 'x';
// //   const options = { expiresIn: '1h' };
// //   const token = jwt.sign(payload, secretKey, options);
// //   console.log('JWT Token:', token);
  
// //   // בדיקת תקינות הטוקן JWT
// //   try {
// //     const decoded = jwt.verify(token, secretKey);
// //     console.log('Decoded Token:', decoded);
// //     console.log('User ID:', decoded.userId);
// //     console.log('Username:', decoded.username);
// //   } catch (error) {
// //     console.error('Invalid token:', error.message);
// //   }  
//   const initializePassport = require('./passport-config')
//   initializePassport(
//     passport,
//     email => users.find(user => user.email === email),
//     id => users.find(user => user.id === id)
//   )
  
//   const users = []
  
//   app.set('view-engine', 'ejs')
//   app.use(express.urlencoded({ extended: false }))
//   app.use(flash())
//   app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
//   }))
//   app.use(passport.initialize())
//   app.use(passport.session())
//   app.use(methodOverride('_method'))
  
//   app.get('/', checkAuthenticated, (req, res) => {
//     res.render('index.ejs', { name: req.user.name })
//   })
  
//   app.get('/login', checkNotAuthenticated, (req, res) => {
//     res.render('login.ejs')
//   })
  
//   app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
//   }))
  
//   app.get('/register', checkNotAuthenticated, (req, res) => {
//     res.render('register.ejs')
//   })
  
//   app.post('/register', checkNotAuthenticated, async (req, res) => {
//     try {
//       const hashedPassword = await bcrypt.hash(req.body.password, 10)
//     //   const data = {
//     //     id: Date.now().toString(),
//     //     name: req.body.name,
//     //     email: req.body.email,
//     //     password: hashedPassword
//     // }
//     // await collection.insertMany([data])
//       users.push({
//         id: Date.now().toString(),
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPassword
//       })
//       res.redirect('/login')
//     } catch {
//       res.redirect('/register')
//     }
//   })
  
  
//   app.delete('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/login')
//   })
  
//   function checkAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return next()
//     }
  
//     res.redirect('/login')
//   }
  
//   function checkNotAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return res.redirect('/')
//     }
//     next()
//   }
  
//   app.listen(3000)