// image.controller.js
import { asyncHandler } from '../utills/asyncHandler.js';
import { ApiError } from '../utills/ApiError.js';
import { Image } from '../models/image.model.js';
import { uploadOnCloudinary } from '../utills/cloudinary.js';



const createImage = asyncHandler(async (req, res) => {
    console.log(req)
    const { title } = req.body;
    if (!title) {
        throw new ApiError(400, 'Title is required');
    }
   console.log(req.file)
    const imageLocalPath = req.file?.path;
    if (!imageLocalPath) {
        throw new ApiError(400, 'Image is required');
    }

    const image = await uploadOnCloudinary(imageLocalPath);
    if (!image) {
        throw new ApiError(400, 'Image upload failed');
    }

    const newImage = await Image.create({
        title,
        url: image.secure_url,
    });

    if (!newImage) {
        throw new ApiError(400, 'Image is not created');
    }

    res.json({ message: 'Image created successfully', data: newImage });
});

const getImage = asyncHandler(async (req, res) => {
    const images = await Image.find({});
    console.log(images)
    res.json({ data: images });
});

const deleteImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, 'Id is required');
    }

    const imagetodelete = await Image.findById(id);
    if (!imagetodelete) {
        throw new ApiError(500, 'Image not found');
    }

    await Image.findByIdAndDelete(id);
    res.json({ message: 'Image deleted successfully' });
});

export {
    createImage,
    getImage,
    deleteImage,
};
