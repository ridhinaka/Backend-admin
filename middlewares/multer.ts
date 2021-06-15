// import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: (req: Request, file: any, cb: any): any => {
//     cb(null, './uploadsProduct/');
//   },
//   filename: (req: Request, file: any, cb: any): any => {
//     cb(null, Date.now() + file.originalname);
//   }
// });

// const fileFilter = (req: Request, file: any, cb: any) => {
//   if (file.mimetype === 'productImage/jpg' || file.mimetype === 'productImage/png' || file.mimetype === 'productImage/jpeg') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//     console.log('format must jpg,jpeg,png')
//   }
// };
// const uploads = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilter
// });

// module.exports = { uploads }
