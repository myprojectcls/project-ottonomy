import express from "express";
import multer from "multer";
import path from "path";
import { 
  addImage, 
  getImages, 
  updateImageOrder, 
  updateImage, 
  deleteImage 
} from "../controllers/imageController";

const router = express.Router();

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure the 'uploads/' directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File Type Filter
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPG and PNG are allowed."), false);
  }
};

// Multer Upload Instance
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.post("/upload", upload.single("image"), addImage);
router.get("/", getImages);
router.put("/reorder", updateImageOrder);
router.put("/:id", upload.single("image"), updateImage);  // Update Image
router.delete("/:id", deleteImage);  // Delete Image

export default router;
