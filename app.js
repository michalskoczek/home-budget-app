const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const homepageRouter = require('./routes/homepage');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const userPageRouter = require('./routes/user/user-page');

const errorController = require('./controllers/error');

dotenv.config({ path: './config/.env' });
const PORT = process.env.PORT || 3000;

connectDB();

const app = express();
const store = new MongoDBStore({
  uri: process.env.DB_URI,
  collection: 'sessions',
});
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }), express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, '/node_modules/flickity/dist')));
app.use(
  session({
    secret: 'my secret code',
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
);
app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.isLogged = req.session.isLogged;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(flash());

app.use('/', homepageRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/user', userPageRouter);

app.get('/500', errorController.getError500Page);

app.use(errorController.getErrorPage);

app.use((error, req, res, next) => {
  res.status(500).render('error-500-page', {
    errorPageTitle: 'Error | Home Budget App',
    path: '/',
    isLogged: req.session.isLogged,
    userName: req.session.userName,
  });
});

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
