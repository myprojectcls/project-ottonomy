import { Request, Response } from "express";
import Image from "../models/Image";

export const addImage = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const imageUrl = `/uploads/${req.file?.filename}`;
        const newImage = new Image({ title, description, imageUrl });
        await newImage.save();
        res.status(201).json(newImage);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getImages = async (req: Request, res: Response) => {
    try {
        const images = await Image.find().sort("order");
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const updateImageOrder = async (req: Request, res: Response) => {
    try {
        const { images } = req.body;
        for (let i = 0; i < images.length; i++) {
            await Image.findByIdAndUpdate(images[i]._id, { order: i });
        }
        res.json({ message: "Order updated" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const updateImage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
        const updatedData: any = { title, description };
        if (imageUrl) updatedData.imageUrl = imageUrl;
        const updatedImage = await Image.findByIdAndUpdate(id, updatedData, { new: true });
        res.json(updatedImage);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteImage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Image.findByIdAndDelete(id);
        res.json({ message: "Image deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
