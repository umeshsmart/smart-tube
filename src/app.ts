import express, {  Request, Response } from 'express';
import middlewares from './middlewares';
import routes from './routes';
import { logger } from './utils/logger';
import path from 'path';
import ejs from 'ejs';
import expressLayouts from 'express-ejs-layouts';

const app: express.Application = express();
const BASE_PATH: string = __dirname; //set base path

//frontend
app.locals.baseURL = process.env.URL_HOST;
app.use(express.static('./'));
app.use(express.static('./public'));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use(expressLayouts);
app.set('layout', 'layout.ejs');
app.use(express.static(path.join(__dirname, 'public')));

middlewares(app); // bind middlewares

routes(app); // bind all routes

// Base route to health check
app.get('/health', (req: Request, res: Response) => {
  logger.info({reqUuid:`${req.custom.reqUuid}`,where:`${__filename}`,message:req.__('HEALTH_CHECK')});                                                	 
  return res.status(200).send(req.__('HEALTH_CHECK'));
});

// Handle invalid Route
app.all('/*', (req: Request, res: Response) => {
  logger.error({reqUuid:`${req.custom.reqUuid}`,where:`${__filename}`,message:req.__('INVALID_URL')});                                                	   
  //return res.status(200).send(req.__('INVALID_URL'));  
  return res.render('pages/404.ejs');
});

export { app, BASE_PATH };
  
