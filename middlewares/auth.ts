import { NextFunction, Response, Request, ErrorRequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';

class authJwt {
  static authentication(req: Request, res: Response, next: NextFunction) {
    const accessToken:any = req.headers.accesstoken
    if (!accessToken) {
        console.log("missing acces token")
        return res.status(401).json({msg: 'Missing access token', success: false})
    }
    
    const secretKey: string = (process.env.SECRET_KEY as string)
    jwt.verify(accessToken, secretKey, (err:any, decoded:any) => {
        if (err) {
          res.status(401).json({ msg: 'Invalid token', success: false })
        }
        (<any>req).Id = decoded.id
        next()
    })
  }
}

export default authJwt