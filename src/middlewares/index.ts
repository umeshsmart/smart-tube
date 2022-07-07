
import express,{ Application, NextFunction, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import { logger } from '../utils/logger';
import { i18n } from './Internationalization';
import uuid from './uuid';

export default (app: Application) => {

  app.use(express.json()); // Use body parser
  app.use(express.urlencoded({ limit: '500mb', extended: true })); // url encode with bodyParser  
  app.use(i18n.init); // support internationalization
  app.use(fileUpload());//file upload
  app.use(underMaintenanceCheck); // check to see if app is under maintenance
  uuid(app); // add uuid in req if not available 
  // add all other middleware here
};

let underMaintenanceCheck = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.APP_UNDER_MAINTAINANCE === 'true') {
    logger.info({reqUuid:`${req.custom.reqUuid}`,where:`${__filename}`,message:req.__('SERVICE_UNAVAILABLE')});                                                	     
    res.status(503).json({
      status: 503,
      message: req.__('SERVICE_UNAVAILABLE')
    });
    return;
  } else {
    next();
  }
};
