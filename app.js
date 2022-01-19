const bodyParser = require('body-parser');
const { request } = require('express');
const express = require('express');
const session = require('express-session')
let app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();
});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"))
app.get('/', (req, res) => {
    console.log(req.session.isAuth, req.session.user)
    res.render('home.ejs')
})

app.use('/product', require('./routers/productRouter'))

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if(username == "admin" && password === "admin"){
        req.session.isAuth = true
        req.session.user = { username: "Aissam" }
        res.redirect('/')
    } else {
        res.redirect('/login')
    }
    
})

app.listen(9999);


