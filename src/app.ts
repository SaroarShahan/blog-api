import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from '~/routes/authRoutes';
import postRoutes from '~/routes/postRoutes';
import dbConnect from '~/config/dbConeect';

dbConnect();

const _PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/posts', postRoutes);

app.listen(_PORT, () => {
  console.log(`Server is running on port ${_PORT} http://localhost:${_PORT}`);
});
