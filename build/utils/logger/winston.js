"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, printf } = winston_1.format;
const myFormat = printf(({ reqUuid, timestamp, level, where, message }) => {
    //return `Request: Timestamp ${timestamp} [ ReqUuid: ${reqUuid} ] Level: ${level} Where: ${where} Message: ${message}`;
    return `Request: ${timestamp} | [ ${reqUuid} ] | ${level} | ${where} | ${message}`;
});
class winstonClass {
    constructor() {
        this.logger = (0, winston_1.createLogger)({
            format: combine(timestamp(), myFormat),
            transports: [
                new winston_1.transports.Console(),
                new winston_1.transports.File({ filename: './logs/combined.log' }),
                new winston_1.transports.File({ filename: './logs/error.log', level: 'error' }),
                new winston_1.transports.File({ filename: './logs/warn.log', level: 'warn' }),
                new winston_1.transports.File({ filename: './logs/info.log', level: 'info' }),
            ]
        });
    }
}
exports.default = new winstonClass().logger;
