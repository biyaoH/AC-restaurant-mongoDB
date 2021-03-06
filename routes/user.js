const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../models/user')
// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入檢查
router.post('/login', (req, res, next) => {
  // res.send('login')
  passport.authenticate('local', {  // 使用 passport 認證
    successRedirect: '/',   // 登入成功會回到根目錄
    failureRedirect: '/users/login'  // 失敗會留在登入頁面
  })(req, res, next)
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊檢查
router.post('/register', (req, res) => {

  // const name = req.body.name
  // const email = req.body.email
  // const password = req.body.password
  // const password2 = req.body.password2
  const { email, password, password2 } = req.body
  const name = (req.body.name.length === 0) ? 'new' : req.body.name
  console.log('name is :', name)


  let errors = []

  if (!email || !password || !password2) {
    errors.push({ message: '請填寫必填欄位' })
    console.log('請填寫必填欄位')
  }
  if (password !== password2) {
    errors.push({ message: '密碼輸入錯誤' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了' })
        res.render('register', {
          name,
          email,
          password,
          password2
        })
      } else {
        const newUser = new User({
          name,
          email,
          password
        })

        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash

            console.log(newUser)
            newUser
              .save()
              .then(user => {
                res.redirect('/')
              })
              .catch(err => console.log(err))
          })
        )
      }
    })
  }
})

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})

module.exports = router