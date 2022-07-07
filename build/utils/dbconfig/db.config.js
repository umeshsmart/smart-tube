"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class mysqlDBClass {
    constructor() {
        this.sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || "", process.env.DB_USER || "", process.env.DB_PASSWORD, {
            host: process.env.DB_HOST || "",
            dialect: 'mysql',
            port: Number(process.env.DB_PORT) || 3306
        });
        this.sequelize.sync({ force: true });
    }
}
exports.default = new mysqlDBClass().sequelize;
