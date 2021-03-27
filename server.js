import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

// import error middlewares here
import { notFound, serverError } from "./middlewares/errorMiddleware.js"
dotenv.config();

const app = express();

// run utility middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(helmet());

//home route
app.get('/', (req, res) => {
    res.send("Welcome to the API server!")
})

// run error middlewares at the bottom of the file
app.use(notFound);
app.use(serverError);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`api server running on port: ${PORT}`));