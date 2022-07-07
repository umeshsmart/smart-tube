import winston,{ createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

const myFormat = printf(({  reqUuid, timestamp ,level,where, message }) => 
{
  //return `Request: Timestamp ${timestamp} [ ReqUuid: ${reqUuid} ] Level: ${level} Where: ${where} Message: ${message}`;
  return `Request: ${timestamp} | [ ${reqUuid} ] | ${level} | ${where} | ${message}`;
});

class winstonClass
{ 
  public logger
  constructor()
  {
    this.logger=createLogger
    (
      {
        format: combine(           
          timestamp(),
          myFormat
        ),
        transports: 
        [
          new transports.Console(),
          new transports.File({ filename: './logs/combined.log' }),
          new transports.File({ filename: './logs/error.log', level: 'error' }),      
          new transports.File({ filename: './logs/warn.log', level: 'warn' }),
          new transports.File({ filename: './logs/info.log', level: 'info' }),
          
        ]
      }
    );
  }  
}


export default new winstonClass().logger;
