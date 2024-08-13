import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoute.js'
import subjectRoutes from './routes/subjectRoute.js'
//import tagRoutes from './routes/tagsRoute.js'
import levelRoutes from './routes/levelRoute.js'
import courseRoutes from './routes/courseRoute.js'
import basetestRoutes from './routes/baseTestRoute.js'
import userTestRoute from './routes/userTestRoute.js'
import whishlistRoute from './routes/whishlistRoute.js'
import cartRoute from './routes/cartRoute.js'
import stripeRoute from './routes/stripeRoute.js'
import transcribeRoute from './routes/transcription.js'

dotenv.config();
connectDB();
const app = express();
app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(morgan('dev'));
app.use('/media/uploads', express.static('media/uploads'));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/auth', categoryRoutes);
app.use('/api/v1/auth', subjectRoutes);
//app.use('/api/v1/auth', tagRoutes);
app.use('/api/v1/auth', levelRoutes);
app.use('/api/v1/courses',courseRoutes);
app.use('/api/v1/basetest',basetestRoutes);
app.use('/api/v1/test',userTestRoute);
app.use('/api/v1/save/',whishlistRoute)
app.use('/api/v1/carts',cartRoute)
app.use('/api/v1/payment',stripeRoute)
app.use('/api/v1/transcribe', transcribeRoute);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
      message: 'Something went wrong!'
    });
  });
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT}.`);
});