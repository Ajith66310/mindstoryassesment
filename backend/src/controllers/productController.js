import Product from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";
import sharp from "sharp";
import streamifier from "streamifier";


const uploadBufferToCloudinary = (fileBuffer, folder = "products") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, quality: "auto:best", allowed_formats: ["jpg", "png", "webp"] },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};


export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, units } = req.body;

    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      
      const uploadPromises = req.files.map(async (file) => {
        const buffer = await sharp(file.buffer)
          .resize(1000, 1000, { fit: "cover" })
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toBuffer();
        const result = await uploadBufferToCloudinary(buffer);
        return result.secure_url;
      });
      imageUrls = await Promise.all(uploadPromises);
    }

    const product = await Product.create({
      title,
      description,
      price,
      category,
      units: Number(units),
      images: imageUrls,
    });

    res.status(201).json({ success: true, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, category, units } = req.body;

    let updatedFields = { title, description, price, category, units };


    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        const buffer = await sharp(file.buffer)
          .resize(1000, 1000, { fit: "cover" })
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toBuffer();
        const result = await uploadBufferToCloudinary(buffer);
        return result.secure_url;
      });
      updatedFields.images = await Promise.all(uploadPromises);
    }

    const updated = await Product.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updated) return res.status(404).json({ message: "Product not found" });

    res.json({ success: true, product: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};


export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};


export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};


export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted successfully" });
};
