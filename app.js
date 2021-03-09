const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const homepageRouter = require('./routes/homepage');
const registerRouter = require('./routes/register');
const postRoute = require('./routes/posts');
const loginRouter = require('./routes/login');

const errorController = require('./controllers/error');

const budgetRouter = require('./routes/budget');

dotenv.config({ path: './config/.env' });
const PORT = process.env.PORT || 3000;

connectDB();

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }), express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, '/node_modules/flickity/dist')));

app.use('/budget', budgetRouter);

app.use('/', homepageRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/posts', postRoute);

app.use(errorController.getErrorPage);

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
