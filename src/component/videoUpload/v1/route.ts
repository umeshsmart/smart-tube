import{ Router ,Request,Response} from 'express';
import { BASE_PATH } from '../../../app';
import { rootPath } from '../../../utils/constants';
import { logger } from '../../../utils/logger';
import { Model } from '../models';
import path from 'path';
const videoUpload = Router();
const fs=require("fs");
import { v4 as uuidv4 } from "uuid";


// Take in the request & filepath, stream the file to the filePath
const uploadFile = (req:any, filePath:any) => {
    return new Promise((resolve, reject) => {
     const stream = fs.createWriteStream(filePath);
     
     // With the open - event, data will start being written
     // from the request to the stream's destination path
     stream.on('open', () => {
      console.log('Stream open ...  0.00%');      
      req.pipe(stream);
     });
   
     // Drain is fired whenever a data chunk is written.
     // When that happens, print how much data has been written yet.
     stream.on('drain', async() => {
      const written = parseInt(stream.bytesWritten);                  
      await fs.stat(req.path, (error:any, stats:any) => {
        if (error) {
          console.log(error);
        }
        else {          
          const total = parseInt(stats.size);
          //const total=parseInt(req.headers['content-length']);
          const pWritten = ((written / total) * 100).toFixed(2);
          console.log(`Processing  ...  ${pWritten}% done`);          
        }
      });      
     });
   
     // When the stream is finished, print a final message
     // Also, resolve the location of the file to calling function
     stream.on('close', () => {
      console.log('Processing  ...  100%');
      resolve(filePath);
     });

      // If something goes wrong, reject the primise
     stream.on('error', (err:any) => {
      console.error(err);
      reject(err);
     });
    });
};

// Add a route to accept incoming post requests for the fileupload.
// Also, attach two callback functions to handle the response.
videoUpload.post('/',async (req:any, res:any) => {
    const {reqUuid}=req.custom;                        
    logger.info({reqUuid:`${reqUuid}`,where:`${__filename}/SmartTube/playVideo`,message:`SmartTube playVideo route`});													                                    
    var uuid=uuidv4();
    //changing file name
    const extensionName = path.extname(req.files.file.name); // fetch the file extension				
    var video_path:any="file-" + Date.now()+extensionName;

    var data={
      uuid:uuid,
      video_name:req.body.name,
      video_path:video_path
    }

    // import os module
    const os = require("os");

    // get temp directory
    const tempDir = os.tmpdir(); //path
    if(req.files && req.files.file )
    {      
          
        //Upload locally       
        let coverimagePath =tempDir+'/temp.mp4';  
        console.log("TEMP:::::",coverimagePath);      
        await req.files.file.mv(coverimagePath, function (err:any) 
        {
          if (err) 
          {
            console.log(err);
          }
          else
          {
            let stream = fs.createReadStream(coverimagePath);  
            const filePath = path.join(rootPath+"src/videos/"+video_path);            
            uploadFile(stream, filePath)
                .then(async ()=>{                 
                  await Model.addVideo(reqUuid,data);
                  res.redirect('/SmartTube/?success=Video Uploaded Successfully');
                }) 
                .catch(err => res.redirect('/SmartTube/?error=Video Uploaded Failed'));    
          }
        });
        
    }
    else
    {
        res.send({ status: 'error', Message:'Please upload file first' })
    }
   
});

export default videoUpload;