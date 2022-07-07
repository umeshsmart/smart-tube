import {Sequelize} from 'sequelize';

class mysqlDBClass
{
    
    public sequelize
    constructor()
    {     
        this.sequelize = new Sequelize
        (  
            process.env.DB_NAME || "" ,
            process.env.DB_USER || "" ,
            process.env.DB_PASSWORD ,
            {
                host: process.env.DB_HOST || "", 
                dialect:'mysql',
                port:Number(process.env.DB_PORT) || 3306
                
                
            }
            
        );        
        this.sequelize.sync({force:true});
    }
    
}

export default new mysqlDBClass().sequelize;