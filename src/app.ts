import express from 'express';
require('dotenv').config();

const _PORT = process.env.PORT || 4000;
const app = express();

app.listen(_PORT, () => {
  console.log(`Server is running on port ${_PORT}`);
});
