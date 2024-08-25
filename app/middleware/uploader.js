const multer = require("multer");
const path = require("path");
// storage engine 

const storage = multer.diskStorage({
    // destination: './upload/images',
    destination: function (req, file, cb) {
        //where to store the file
        cb(null, './upload/images');
      },
    filename: (req, file, cb) => {
        // return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
       cb(null, file.originalname);
        // return cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000
    }
}).fields([{name:'image', maxCount: 1},{ name: 'Image1', maxCount: 1 }, { name: 'Image2', maxCount: 1 },{ name: 'categorylogo', maxCount: 1 }, { name: 'headinglogo', maxCount: 1 }, { name: 'profile', maxCount: 1 }]);

module.exports = upload;
