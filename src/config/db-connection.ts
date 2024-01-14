import mongoose from 'mongoose'

export const dbConnection = (): void => {
  try {
    const connect = mongoose.connect(process.env.MONGO_URI);
    if (connect) console.log('DB connected successfully!');
  } catch (error) {
    console.log(error);
  }
}