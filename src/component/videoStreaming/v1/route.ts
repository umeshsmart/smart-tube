import{ Router ,Request,Response} from 'express';
import { BASE_PATH } from '../../../app';
import { rootPath } from '../../../utils/constants';
import { logger } from '../../../utils/logger';
import { Model } from '../models';
import controller from './controller';
const videoStreaming = Router();
const fs=require("fs");

videoStreaming.get('/',
async(req: Request, res: Response) => 
    {
        const {reqUuid}=req.custom;                        
        logger.info({reqUuid:`${reqUuid}`,where:`${__filename}/videoStreaming/home`,message:`videoStreaming home frontend route`});													                                    
        var condition:any={};
        var data=await Model.getManyVideos(reqUuid,condition);
        
        var message:any={};
		if(req.query.error)
		{					
			message.error=req.query.error
		}
		if(req.query.success)
	    {
			message.success=req.query.success
		}
        return res.render('pages/list.hbs', {
            results: data,
            message:message
        });
    }
);  

videoStreaming.get('/playVideo/:uuid',
async(req:Request,res:Response)=>
{
    const {reqUuid}=req.custom;                        
    logger.info({reqUuid:`${reqUuid}`,where:`${__filename}/videoStreaming/playVideo`,message:`videoStreaming playVideo route`});													                                    
    const { uuid } = req.params;    
    const range=req.headers.range || "";
    if(!range)
    {
        res.status(400).send("Required range header");
    }

    var condition:any={
        where:
        {
            uuid:uuid
        }
    };
    var data:any=await Model.getOneVideo(reqUuid,condition);      
    const videoPath=rootPath+"src/videos/"+data.video_path;    
    console.log(videoPath);
    const videoSize=fs.statSync(videoPath).size;
    
    const chunk_size=10 **6;//1MB
    const start= Number(range.replace(/\D/g,""));
    const end=Math.min(start+chunk_size,videoSize-1);

    const contentLength=end-start+1;
    const headers={
        "Content-Range":`bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges":"bytes",
        "Content-Length":contentLength,
        "Content-Type":"video/mp4",
    };

    res.writeHead(206,headers);
    const videoStream=fs.createReadStream(videoPath,{start,end});
    videoStream.pipe(res);
    
})

export default videoStreaming;