import express from "express";
import multer from "multer";
import { getTextExtractor } from "office-text-extractor";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/convert-pptx-to-text",
  upload.single("pptxFile"),
  async (req, res) => {
    try {
      // Access the uploaded file from memory
      const pptxBuffer = req.file.buffer;

      // Create a text extractor instance
      const extractor = getTextExtractor();

      // Extract text from the uploaded PPTX file
      const text = await extractor.extractText({
        input: pptxBuffer, // Pass the file buffer
        type: "buffer",
      });

      // Remove newline characters (\n)
      const cleanText = text.replace(/\r?\n|\r/g, "");

      // Split the text into blocks of 500 characters
      const blockSize = 1500;
      const textBlocks = [];
      for (let i = 0; i < cleanText.length; i += blockSize) {
        textBlocks.push(cleanText.slice(i, i + blockSize));
      }
      // Send the extracted text as a response
      res.json({ pptxTextBlocks: textBlocks });
    } catch (error) {
      console.log(error);
      res.status(500).send("An error occurred during conversion.");
    }
  }
);

export default router;
