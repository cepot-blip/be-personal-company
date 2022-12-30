import multer from "multer"
import path from "path"

// avatar storage
const avatar_storage = multer.diskStorage({
	filename: (req, files, cb) => {
		cb(null, Date.now() + "_" + files.originalname)
	},
	destination: (req, files, cb) => {
		cb(null, path.join(__dirname, `../../static/public/uploads/avatar/`))
	},
})


// PRODUCT STORAGE
const product_storage = multer.diskStorage({
	filename: (req, files, cb) => {
		cb(null, Date.now() + "_" + files.originalname)
	},
	destination: (req, files, cb) => {
		cb(null, path.join(__dirname, `../../static/public/uploads/product/`))
	},
})


// BANNER STORAGE
const banner_storage = multer.diskStorage({
	filename: (req, files, cb) => {
		cb(null, Date.now() + "_" + files.originalname)
	},
	destination: (req, files, cb) => {
		cb(null, path.join(__dirname, `../../static/public/uploads/banner/`))
	},
})

// MEDIA STORAGE
const media_storage = multer.diskStorage({
	filename: (req, files, cb) => {
		cb(null, Date.now() + "_" + files.originalname)
	},
	destination: (req, files, cb) => {
		cb(null, path.join(__dirname, `../../static/public/uploads/media/`))
	},
})



const avatar_uploads = multer({
	storage: avatar_storage,
	limits: {
		fileSize: 50000000,
	},
})


const banner_uploads = multer({
	storage: banner_storage,
	limits: {
		fileSize: 50000000,
	},
})

const product_uploads= multer({
	storage: product_storage,
	limits: {
		fileSize: 50000000,
	},
})

const media_uploads= multer({
	storage: media_storage,
	limits: {
		fileSize: 50000000,
	},
})

export {
    product_uploads,
    avatar_uploads,
	banner_uploads,
	media_uploads
}
