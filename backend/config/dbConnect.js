
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.v8l0i.mongodb.net/${process.env.DATABASE}`);

let db = mongoose.connection;

export default db;