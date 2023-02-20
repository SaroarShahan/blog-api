import mongoose from 'mongoose';

const dbConnect = () => {
  mongoose
    .set('strictQuery', false)
    .connect(process.env.DB_URL!)
    .then((connect) => {
      console.log(`Databse is running at ${connect.connection.host}`);
    })
    .catch((error) => {
      console.warn(error);
      process.exit(1);
    });
};

export default dbConnect;
