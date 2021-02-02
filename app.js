const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const homepageRouter = require('./routes/homepage');
const registerRouter = require('./routes/register');

dotenv.config({ path: './config/.env' });
const PORT = process.env.PORT || 3000;

connectDB();

const app = express();
app.use(express.json());

app.use('/', homepageRouter);
app.use('/register', registerRouter);

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
