const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const homepageRouter = require('./routes/homepage');

dotenv.config({ path: './config/.env' });
const PORT = process.env.PORT || 3000;

connectDB();

const app = express();

app.use('/', homepageRouter);

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
