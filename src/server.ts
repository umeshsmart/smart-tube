import { createServer } from 'http';
import { config } from 'dotenv';
import { resolve } from 'path';
import { logger } from './utils/logger';

/**
 * Load Env
 */
config({ path: resolve(__dirname, '../.env') });

/**
 * Load App
 */
import { app } from './app';

/**
 * Load Database
 */
 import sequelize from './utils/dbconfig';


/**
 * Creating server
 */
const server = createServer(app);
const port: number = Number(process.env.PORT || 3000);

(async () => 
{
  try 
  {   
    await sequelize.authenticate();
    logger.info({reqUuid:`mysql Initialize`,where:`${__filename}`,message:`Mysql Connection has been established successfully.`});                                                	 
    
    server.listen(port, () => {
      logger.info({reqUuid:`server Initialize`,where:`${__filename}`,message:`Server is running on ${port}`});                                                                   		
    });    
  } catch (error:any) {
    logger.error({reqUuid:`server Initialize`,where:`${__filename}`,message:`${error}`});                                                                   			  	
    process.exit(1);
  }
})();
