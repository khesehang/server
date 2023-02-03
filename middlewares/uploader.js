const multer = require('multer');
const path = require('path');

module.exports = function (filterType) {
    function imageFilter(req, file, cb) {
        // file filter will skip the upload
        const mimeType = file.mimetype.split('/')
        // mimeTYpe ==['image','png']
        if (mimeType[0] === 'image') {
            cb(null, true) //proceed with upload
        } else {
            req.fileTypeError = true;
            cb(null, false) // skip upload
        }
    }

    const myStorage = multer.diskStorage({
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        },
        destination: function (req, file, cb) {
            cb(null, path.join(process.cwd(), 'uploads/images'))
        }
    })
    // TODO use filterTYpe to filter the upload

    const upload = multer({
        storage: myStorage,
        fileFilter: imageFilter
    })

    return upload;
}



// module.exports = function (filterType) {
//     function imageFilter(req, file, cb) {
//         // file filter will skip the upload
//         const mimeType = file.mimetype.split('/')
//         // mimeType == ['image','png']
//         if (mimeType[0] === 'image') {
//             cb(null, true);//proceed with the upload
//         } else {
//             req.fileTypeError = true;
//             cb(null, true); //skip upload
//         }
//     }

//     const myStorage = multer.diskStorage({
//         filename: function (req, file, cb) {
//             cb(null, Date.now() + '' + file.originalname)
//         },
//         destination: function (req, file, cb) {
//             cb(null, path.join(process.cwd(), 'uploads/images'))
//         }
//     })

//     upload = multer({
//         storage: myStorage,
//         fileFilter: imageFilter
//     })
//     return upload;
// }