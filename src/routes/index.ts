import { Application } from 'express';
import videoStreaming from '../component/videoStreaming/v1/route';
import videoUpload from '../component/videoUpload/v1/route';
/**
 * Init All routes here
 */
export default (app: Application) => 
{
    app.use('/SmartTube',videoStreaming);
    app.use('/SmartTube/upload',videoUpload);
};
