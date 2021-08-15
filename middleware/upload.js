const multer = require('multer')
const config = require('config')
const { GridFsStorage } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
    url: config.get('mongoURI'),
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ['image/jpeg', 'image/png']

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-dev-${file.originalname}`
            return filename
        }

        return {
            bucketName: 'photos',
            filename: `${Date.now()}-dev-${file.originalname}`
        }

    }
})

module.exports = multer({ storage })