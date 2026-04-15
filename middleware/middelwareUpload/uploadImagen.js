import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype?.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten archivos de tipo image'));
    }
};

const upload = multer({
    storage,
    fileFilter
});

const uploadImagen = (req, res, next) => {
    upload.single('archivo')(req, res, error => {
        if (!error) {
            return next();
        }

        if (error instanceof multer.MulterError) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(400).json({ error: error.message });
    });
};

export default uploadImagen;
