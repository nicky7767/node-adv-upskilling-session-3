import mongoose from 'mongoose';


export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://vinaychenn07:12345@cluster0.hzff9oy.mongodb.net/koa_crud_db");
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};
