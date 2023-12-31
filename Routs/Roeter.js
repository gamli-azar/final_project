// const express =require('express')
// const app= express ()
// const passport = require('passport')

// const router =express.Router()
// const User = require('../mongodb')
// const initializePassport = require('../passport-config')
// initializePassport(
//     passport,
//     email => User.findOne({ email: email }),
//     id => User.findById(id)
//     // email => users.find(user => user.email === email),תזכור את זה צריך להחזיר  והחליף בשתי שורות למעלה
//     // id => users.find(user => user.id === id)
//   )
//   app.use(passport.initialize())
// app.use(passport.session())

// router.get('/', checkAuthenticated, (req, res) => {
//     res.render('index.ejs', { name: req.user.name })
//   })
  
//   router.get('/login', checkNotAuthenticated, (req, res) => {
//     res.render('login.ejs')
//   })
  
//   router.post('/login',  checkNotAuthenticated,  passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true 
//     }  )
//     )
//     router.get('/register', checkNotAuthenticated,  (req, res) => {
//     res.render('register.ejs')    
//   })
//   router.post('/register', checkNotAuthenticated, async(req, res) => {
//     try {
//       // בדיקה אם האימייל כבר קיים במערכת
//       const existingUser = await User.findOne({ email: req.body.email });
//       if (existingUser) {
//       // return  res.status(400).render('indexx.ejs')   זה עבד טוב רק צריך ליצור קובץ בשם הז  בviews
//         // אם האימייל כבר קיים, תחזיר שגיאה
//         return res.status(400).send('האימייל כבר קיים במערכת')
//         // return res.redirect('/').send('no no no no  ')
//         ;}
//       const hashedPassword = await bcrypt.hash(req.body.password, 10)
//       console.log(hashedPassword);
//       // const data = {
//       //           id: Date.now().toString(),
//       //           name: req.body.name,       תזכור את זה צריך להחזיר  כולל מה שבאמצע ולקפל במשולש
//       //           email: req.body.email,
//       //           password: hashedPassword
//       //       } 
//       //       await collection.insertMany([data])
//       // const confirmationToken = generateUniqueToken(); ////////////////////אלה חדשים  שים לב
//       const newUser = new User({
//         email: req.body.email,
//         password: hashedPassword,
//         // confirmationToken: confirmationToken ///////////////////////////////אלה חדשים  שים לב
//       });
//       // if(  newUser ==newUser ){res.send('nono no no');}
//       //   //  req.body.email || hashedPassword  
//       // // console.log(newUser);
  
//       await newUser.save();
//       // sendConfirmationEmail(newUser);//////////////////////////////אלה חדשים  שים לב
  
//       // sendConfirmationEmail(req.body.email, confirmationToken);////////////
  
//       res.status(201).send('הרשמתך בוצעה בהצלחה!');
//       ///////////////////////////////////////
//       // const newUser = new User({
//       //   name: req.body.name,
//       //   email: req.body.email,
//       //   password: hashedPassword
//       // });
//       // await newUser.save();
  
  
  
//       // users.push({
//       //   id: Date.now().toString(),
//       //   name: req.body.name,
//       //   email: req.body.email,
//       //   password: hashedPassword
//       // })
//       res.redirect('/login')
//     } catch {
//       // res.redirect('/register')
//     }
//   })
//   ///////////////////////////////////////////
//   // app.delete('/logout', (req, res) => {
//   //   req.logOut()
//   //   res.redirect('/login')
//   // })
//   ///////////////////////////////////////////
//   router.delete('/logout', function(req, res, next) {
//     req.logout(function(err) {  // do this
//       if (err) { return next(err); }// do this
//       res.redirect('/login');
//     });
//   });

//   function checkAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return next()
//     }
//     res.redirect('/login')
//     }
//   function checkNotAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return res.redirect('/')
//     }
//     next()
//   }
  

//   module.exports=router



const express =require('express')
const app= express ()
const passport = require('passport')

const router =express.Router()
const User = require('../mongodb')


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

    module.exports=router
