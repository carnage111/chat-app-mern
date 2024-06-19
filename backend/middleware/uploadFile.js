import {v2 as cloudinary} from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import multer from 'multer';
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    allowedFormats: ['jpg', 'png', 'jpeg'],
    params:{
        folder: 'chat-app',
        public_id: (req, file) => Date.now() + '-' + file.originalname.split('.')[0] // use Date.now() + original name without extension as the public ID
    }
})

const upload = multer({
    storage
})

export default upload