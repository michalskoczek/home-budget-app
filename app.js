const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const homepageRouter = require('./routes/homepage');
const registerRouter = require('./routes/register');
const postRoute = require('./routes/posts');

const budgetRouter = require('./routes/budget');

dotenv.config({ path: './config/.env' });
const PORT = process.env.PORT || 3000;

connectDB();

const app = express();
app.use(express.urlencoded({ extended: false }), express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.use('/budget', budgetRouter);

app.use('/', homepageRouter);
app.use('/register', registerRouter);
app.use('/posts', postRoute);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', 'error-page.html'));
});

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
