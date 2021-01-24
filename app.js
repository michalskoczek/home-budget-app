const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config/.env' });
const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Michał');
});

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
