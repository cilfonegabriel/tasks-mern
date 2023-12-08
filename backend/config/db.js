import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        const connection = await mongoose.connect("mongodb+srv://root:root@cluster0.cuanb9z.mongodb.net/tasksMern?retryWrites=true&w=majority",{
           useNewUrlParser: true, 
           useUnifiedTopology: true,
        });  
        
        const url = `${connection.connection.host}:${connection.connection.port}`;

        console.log(`MongoDB connection on: ${url}`);
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
};

export default conectarDB;