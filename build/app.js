"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_PATH = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const middlewares_1 = __importDefault(require("./middlewares"));
const routes_1 = __importDefault(require("./routes"));
const logger_1 = require("./utils/logger");
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const app = (0, express_1.default)();
exports.app = app;
const BASE_PATH = __dirname; //set base path
exports.BASE_PATH = BASE_PATH;
//frontend
app.locals.baseURL = process.env.URL_HOST;
app.use(express_1.default.static('./'));
app.use(express_1.default.static('./public'));
app.set('views', path_1.default.join(__dirname, 'views'));
app.engine('html', ejs_1.default.renderFile);
app.set('view engine', 'html');
app.use(express_ejs_layouts_1.default);
app.set('layout', 'layout.ejs');
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
(0, middlewares_1.default)(app); // bind middlewares
(0, routes_1.default)(app); // bind all routes
// Base route to health check
app.get('/health', (req, res) => {
    logger_1.logger.info({ reqUuid: `${req.custom.reqUuid}`, where: `${__filename}`, message: req.__('HEALTH_CHECK') });
    return res.status(200).send(req.__('HEALTH_CHECK'));
});
// Handle invalid Route
app.all('/*', (req, res) => {
    logger_1.logger.error({ reqUuid: `${req.custom.reqUuid}`, where: `${__filename}`, message: req.__('INVALID_URL') });
    //return res.status(200).send(req.__('INVALID_URL'));  
    return res.render('pages/404.ejs');
});
