"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidationResponse = exports.createResponse = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
/**
 * @description Create Response
 * @param {Object} res
 * @param {Number} status
 * @param {String} message
 * @param {Object} payload
 * @param {Object} pager
 */
const createResponse = (res, status, message, payload = {}, pager = {}) => {
    const resPager = typeof pager !== 'undefined' ? pager : {};
    return res.status(status).json({
        status,
        message,
        payload,
        pager: resPager
    });
};
exports.createResponse = createResponse;
/**
 * @description Send Validation Response
 * @param {Object} res
 * @param {errors} errors - Errors Object
 *
 * @return {*|Sequelize.json|Promise<any>}
 */
const createValidationResponse = (res, errors) => {
    return (0, exports.createResponse)(res, http_status_codes_1.default.UNPROCESSABLE_ENTITY, errors[Object.keys(errors)[0]], { error: errors[Object.keys(errors)[0]] }, {});
};
exports.createValidationResponse = createValidationResponse;
