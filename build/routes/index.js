"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = __importDefault(require("../component/videoStreaming/v1/route"));
const route_2 = __importDefault(require("../component/videoUpload/v1/route"));
/**
 * Init All routes here
 */
exports.default = (app) => {
    app.use('/SmartTube', route_1.default);
    app.use('/SmartTube/upload', route_2.default);
};
