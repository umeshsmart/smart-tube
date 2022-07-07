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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../../../utils/constants");
const logger_1 = require("../../../utils/logger");
const models_1 = require("../models");
const videoStreaming = (0, express_1.Router)();
const fs = require("fs");
videoStreaming.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reqUuid } = req.custom;
    logger_1.logger.info({ reqUuid: `${reqUuid}`, where: `${__filename}/videoStreaming/home`, message: `videoStreaming home frontend route` });
    var condition = {};
    var data = yield models_1.Model.getManyVideos(reqUuid, condition);
    var message = {};
    if (req.query.error) {
        message.error = req.query.error;
    }
    if (req.query.success) {
        message.success = req.query.success;
    }
    return res.render('pages/list.hbs', {
        results: data,
        message: message
    });
}));
videoStreaming.get('/playVideo/:uuid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reqUuid } = req.custom;
    logger_1.logger.info({ reqUuid: `${reqUuid}`, where: `${__filename}/videoStreaming/playVideo`, message: `videoStreaming playVideo route` });
    const { uuid } = req.params;
    const range = req.headers.range || "";
    if (!range) {
        res.status(400).send("Required range header");
    }
    var condition = {
        where: {
            uuid: uuid
        }
    };
    var data = yield models_1.Model.getOneVideo(reqUuid, condition);
    const videoPath = constants_1.rootPath + "src/videos/" + data.video_path;
    console.log(videoPath);
    const videoSize = fs.statSync(videoPath).size;
    const chunk_size = Math.pow(10, 6); //1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunk_size, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
}));
exports.default = videoStreaming;
