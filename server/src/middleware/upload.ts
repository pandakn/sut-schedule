import { Request } from "express";
import multer from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

// Create storage configuration
const storage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) => {
    // Set the destination folder where the uploaded images will be stored
    cb(null, "public/images");
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
    // Set the filename for the uploaded image
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Create multer instance
const upload = multer({ storage: storage });

export default upload;
