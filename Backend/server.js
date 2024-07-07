import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import connectdb from './db/connectdb.js';
import authRoutes from './routes/authRoutes.js';
import quizRoutes from './routes/quizRoutes.js'
const app = express();
dotenv.config();
// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
     console.log(`Server running on port ${PORT}`);
     connectdb();
    }
)
