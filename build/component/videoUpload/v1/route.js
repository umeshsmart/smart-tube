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
const express_1 = require("express");
const constants_1 = require("../../../utils/constants");
const logger_1 = require("../../../utils/logger");
const models_1 = require("../models");
const path_1 = __importDefault(require("path"));
const videoUpload = (0, express_1.Router)();
const fs = require("fs");
const uuid_1 = require("uuid");
// Take in the request & filepath, stream the file to the filePath
const uploadFile = (req, filePath) => {
    return new Promise((resolve, reject) => {
        const stream = fs.createWriteStream(filePath);
        // With the open - event, data will start being written
        // from the request to the stream's destination path
        stream.on('open', () => {
            console.log('Stream open ...  0.00%');
            req.pipe(stream);
        });
        // Drain is fired whenever a data chunk is written.
        // When that happens, print how much data has been written yet.
        stream.on('drain', () => __awaiter(void 0, void 0, void 0, function* () {
            const written = parseInt(stream.bytesWritten);
            yield fs.stat(req.path, (error, stats) => {
                if (error) {
                    console.log(error);
                }
                else {
                    const total = parseInt(stats.size);
                    //const total=parseInt(req.headers['content-length']);
                    const pWritten = ((written / total) * 100).toFixed(2);
                    console.log(`Processing  ...  ${pWritten}% done`);
                }
            });
        }));
        // When the stream is finished, print a final message
        // Also, resolve the location of the file to calling function
        stream.on('close', () => {
            console.log('Processing  ...  100%');
            resolve(filePath);
        });
        // If something goes wrong, reject the primise
        stream.on('error', (err) => {
            console.error(err);
            reject(err);
        });
    });
};
// Add a route to accept incoming post requests for the fileupload.
// Also, attach two callback functions to handle the response.
videoUpload.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reqUuid } = req.custom;
    logger_1.logger.info({ reqUuid: `${reqUuid}`, where: `${__filename}/SmartTube/playVideo`, message: `SmartTube playVideo route` });
    var uuid = (0, uuid_1.v4)();
    //changing file name
    const extensionName = path_1.default.extname(req.files.file.name); // fetch the file extension				
    var video_path = "file-" + Date.now() + extensionName;
    var data = {
        uuid: uuid,
        video_name: req.body.name,
        video_path: video_path
    };
    // import os module
    const os = require("os");
    // get temp directory
    const tempDir = os.tmpdir(); //path
    if (req.files && req.files.file) {
        //Upload locally       
        let coverimagePath = tempDir + '/temp.mp4';
        console.log("TEMP:::::", coverimagePath);
        yield req.files.file.mv(coverimagePath, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                let stream = fs.createReadStream(coverimagePath);
                const filePath = path_1.default.join(constants_1.rootPath + "src/videos/" + video_path);
                uploadFile(stream, filePath)
                    .then(() => __awaiter(this, void 0, void 0, function* () {
                    yield models_1.Model.addVideo(reqUuid, data);
                    res.redirect('/SmartTube/?success=Video Uploaded Successfully');
                }))
                    .catch(err => res.redirect('/SmartTube/?error=Video Uploaded Failed'));
            }
        });
    }
    else {
        res.send({ status: 'error', Message: 'Please upload file first' });
    }
}));
exports.default = videoUpload;
