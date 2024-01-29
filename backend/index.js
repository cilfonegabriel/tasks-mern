import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import conectarDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
app.use(express.json());

dotenv.config()

conectarDB();

// Config Cors
const whitelist = ['http://localhost:5173'];

const corsOptions = {
    origin: function(origin, callback) {
        if(whitelist.includes(origin)) {
            //You can check the API
            callback(null,true);
        } else {
            //You cannot make the request.
            callback(new Error('Error of Cors'));
        }
    }
}

app.use(cors(corsOptions));

// Routing
app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});