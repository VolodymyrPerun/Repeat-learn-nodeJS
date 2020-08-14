const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const loginRoutes = require('./routes/login')
const signinRoutes = require('./routes/signin')
const usersRoutes = require('./routes/users')

const app = express()

// app.use(express.static(path.join(__dirname, 'static', 'views')));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/logon', loginRoutes)
app.use('/signin' ,signinRoutes)
app.use('/users',usersRoutes)



const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
  })

app.engine('hbs', hbs.engine)

app.set('view engine', 'hbs')
app.set('views', 'views')


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
