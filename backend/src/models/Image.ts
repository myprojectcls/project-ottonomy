import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    order: Number,
});

export default mongoose.model("Image", ImageSchema);
