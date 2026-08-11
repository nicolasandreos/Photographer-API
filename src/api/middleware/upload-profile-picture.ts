import multer from "multer";

export const uploadProfilePictureMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("photo");
