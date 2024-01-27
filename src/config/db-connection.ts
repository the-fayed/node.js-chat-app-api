import mongoose from 'mongoose'

export const dbConnection = (): void => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('DB connected successfully!');
  }).catch((error) => {
    console.log(error);
  })
}