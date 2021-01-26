const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const mainRouter = require('./routes/main');

dotenv.config({ path: './config/.env' });
const PORT = process.env.PORT || 3000;

connectDB();

const app = express();

app.use('/', mainRouter);

app.get('/', (req, res) => {
  res.send('Hello Michał');
});

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
