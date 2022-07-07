"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const logger_1 = require("../../../utils/logger");
const Response_1 = require("../../../utils/Response");
class controller {
    startExcelCorn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var reqUuid = "";
            try {
                reqUuid = req.custom.reqUuid;
                logger_1.logger.info({ reqUuid: `${reqUuid}`, where: `${__filename}/controller/startExcelCorn`, message: 'start Excel Corn controller' });
                var result; //=await Model.prepareExcel(reqUuid,"");
                return (0, Response_1.createResponse)(res, http_status_codes_1.default.INTERNAL_SERVER_ERROR, res.__('SERVER_ERROR'), result);
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
            catch (error) {
                logger_1.logger.error({ reqUuid: `${reqUuid}`, where: `${__filename}/controller/startExcelCorn`, message: `${error}` });
                return (0, Response_1.createResponse)(res, http_status_codes_1.default.INTERNAL_SERVER_ERROR, res.__('SERVER_ERROR'), error);
            }
        });
    }
}
exports.default = new controller();
