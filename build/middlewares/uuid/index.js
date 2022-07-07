"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
exports.default = (app) => {
    app.use((req, res, next) => {
        if (req.custom && req.custom.reqUuid) {
            return next();
        }
        let uuidObj = {
            reqUuid: (0, uuid_1.v4)()
        };
        req.custom = uuidObj;
        next();
    });
};
