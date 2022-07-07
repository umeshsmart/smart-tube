import { logger } from "../../../utils/logger";
import { BASE_PATH } from "../../../app";
import { videos } from "../schema";
class ModelClass
{   
    //get one video 
    public async getOneVideo(reqUuid:string,condition:any)
    {
        try 
        {          
            var result=await videos.findOne(condition);
            return result;            
        }
        catch (error:any) 
        {
            logger.error({reqUuid:`${reqUuid}`,where:`${__filename}/videoPublicModelsClass/getOneVideo`,message:`${error}`});                                                            
            return error;
        }
    }

    //get many video 
    public async getManyVideos(reqUuid:string,condition:any)
    {
        try 
        {          
            var result=await videos.findAll(condition);            
            return result;            
        }
        catch (error:any) 
        {
            logger.error({reqUuid:`${reqUuid}`,where:`${__filename}/videoPublicModelsClass/getManyVideo`,message:`${error}`});                                                            
            return error;
        }
    }

 
}
export default new ModelClass();