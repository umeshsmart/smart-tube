import STATUS_CODES from 'http-status-codes';
import { logger } from '../../../utils/logger';
import { createResponse } from '../../../utils/Response';
import { Request,Response } from "express";
import {Model} from "./../models"

class controller 
{    
    
    async startExcelCorn(req: Request, res: Response) 
    {      
      var reqUuid:string="";
      try
      {
          reqUuid=req.custom.reqUuid;                                        
          logger.info({reqUuid:`${reqUuid}`,where:`${__filename}/controller/startExcelCorn`,message:'start Excel Corn controller'});
            
                    
          var result;//=await Model.prepareExcel(reqUuid,"");
          return createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, res.__('SERVER_ERROR'),result);              
          
          
          
          // this.task = cron.schedule('*/15 * * * * *', async() =>  {
          //   var condition={
          //     where: { deleted_at: null },
            
          //   };
          //   var reqUuid=req.custom.reqUuid;                                        
          //   await Model.prepareExcel(reqUuid,condition);
            
          //   console.log('running a task every 15 second ');        
          // }, {
          //   scheduled: false
          // });
    
            
          // this.task.start();

          //return res.status(200).send(req.__('START'));
      }
      catch(error:any)
      {
          logger.error({reqUuid:`${reqUuid}`,where:`${__filename}/controller/startExcelCorn`,message:`${error}`});                                                
          return createResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, res.__('SERVER_ERROR'),error);              
      }
    }
}
export default new controller();