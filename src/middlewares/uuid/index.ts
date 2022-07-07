import express, { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';  

export default (app: express.Application) => {
  app.use((req: Request, res: Response, next: NextFunction) => {    
    if (req.custom && req.custom.reqUuid) {
      return next();
    }
    let uuidObj = {
      reqUuid: uuidv4()
    }
    req.custom = uuidObj;
    next();
  });
};