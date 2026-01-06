import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/mongodb.js";
import productRouter from "./routes/productRoutes.js";


dotenv.config();

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors({
  origin: "*", 
  credentials: true,
}));

app.use("/api/products", productRouter);


const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
};

startServer();
