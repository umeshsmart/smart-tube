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
const logger_1 = require("../../../utils/logger");
const schema_1 = require("../schema");
class ModelClass {
    //video add
    addVideo(reqUuid, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var result = yield schema_1.videos.create(data);
                return result;
            }
            catch (error) {
                logger_1.logger.error({ reqUuid: `${reqUuid}`, where: `${__filename}/videoPublicModelsClass/addVideo`, message: `${error}` });
                return error;
            }
        });
    }
}
exports.default = new ModelClass();
