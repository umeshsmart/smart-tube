import { logger } from "../../../utils/logger";
import { BASE_PATH } from "../../../app";
import { videos } from "../schema";
class ModelClass
{   
       //video add
       public async addVideo(reqUuid:string,data:any)
       {
           try 
           {     
               var result=await videos.create(data);			
               return result;            
           }
           catch (error:any) 
           {
               logger.error({reqUuid:`${reqUuid}`,where:`${__filename}/videoPublicModelsClass/addVideo`,message:`${error}`});                                                            
               return error;
           }
       }
}
export default new ModelClass();