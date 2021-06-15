import { Router, Request, Response } from 'express'
import IRoutes from '../routes/IRoutes'
import multer from 'multer';
import productsController from '../controller/product-controller'


const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb: any): any => {
    cb(null, './uploadsProduct/');
  },
  filename: (req: Request, file: any, cb: any): any => {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req: Request, file: any, cb: any) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    console.log('format must jpg,jpeg,png')
  }
};
const uploads = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


class productRoutes implements IRoutes {
  router: Router
  constructor() {
    this.router = Router()
    this.route()
  }
  route(): void {
    // this.router.post('/product/createproduct', productsController.createProduct)
    this.router.post('/product/createproduct', uploads.single('productImage'), productsController.uploadProduct)
    this.router.get('/product/getProduct', productsController.getProduct)
    this.router.get('/product/:id', productsController.getSpecificProduct)


    this.router.put('/updateStatusProduct/:id', productsController.changeStatusProductActive)
  }
}

export default new productRoutes().router