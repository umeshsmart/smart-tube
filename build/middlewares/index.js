"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const logger_1 = require("../utils/logger");
const Internationalization_1 = require("./Internationalization");
const uuid_1 = __importDefault(require("./uuid"));
exports.default = (app) => {
    app.use(express_1.default.json()); // Use body parser
    app.use(express_1.default.urlencoded({ limit: '500mb', extended: true })); // url encode with bodyParser  
    app.use(Internationalization_1.i18n.init); // support internationalization
    app.use((0, express_fileupload_1.default)()); //file upload
    app.use(underMaintenanceCheck); // check to see if app is under maintenance
    (0, uuid_1.default)(app); // add uuid in req if not available 
    // add all other middleware here
};
let underMaintenanceCheck = (req, res, next) => {
    if (process.env.APP_UNDER_MAINTAINANCE === 'true') {
        logger_1.logger.info({ reqUuid: `${req.custom.reqUuid}`, where: `${__filename}`, message: req.__('SERVICE_UNAVAILABLE') });
        res.status(503).json({
            status: 503,
            message: req.__('SERVICE_UNAVAILABLE')
        });
        return;
    }
    else {
        next();
    }
};
