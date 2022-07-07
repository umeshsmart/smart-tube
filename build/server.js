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
const http_1 = require("http");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const logger_1 = require("./utils/logger");
/**
 * Load Env
 */
(0, dotenv_1.config)({ path: (0, path_1.resolve)(__dirname, '../.env') });
/**
 * Load App
 */
const app_1 = require("./app");
/**
 * Load Database
 */
const dbconfig_1 = __importDefault(require("./utils/dbconfig"));
/**
 * Creating server
 */
const server = (0, http_1.createServer)(app_1.app);
const port = Number(process.env.PORT || 3000);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dbconfig_1.default.authenticate();
        logger_1.logger.info({ reqUuid: `mysql Initialize`, where: `${__filename}`, message: `Mysql Connection has been established successfully.` });
        server.listen(port, () => {
            logger_1.logger.info({ reqUuid: `server Initialize`, where: `${__filename}`, message: `Server is running on ${port}` });
        });
    }
    catch (error) {
        logger_1.logger.error({ reqUuid: `server Initialize`, where: `${__filename}`, message: `${error}` });
        process.exit(1);
    }
}))();
