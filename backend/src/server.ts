import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import imageRoutes from "./routes/imageRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/images", imageRoutes);

const PORT = process.env.PORT || 8000;

mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.log(error));
