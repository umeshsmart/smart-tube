import {Sequelize} from 'sequelize';

class mysqlDBClass
{
    
    public sequelize
    constructor()
    {        
        this.sequelize = new Sequelize
        (   process.env.DB_NAME || "" ,
            process.env.DB_USER || "" ,
            process.env.DB_PASSWORD ,
            {
                host: process.env.DB_HOST || "", 
                dialect:'mysql'
                
                
            }
        );
    }
    
}

export default new mysqlDBClass().sequelize;