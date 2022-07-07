"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbconfig_1 = __importDefault(require("../../../utils/dbconfig"));
class videos extends sequelize_1.Model {
}
videos.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    uuid: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    video_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    video_path: {
        type: new sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: dbconfig_1.default,
    tableName: 'video',
    timestamps: false
});
exports.default = videos;
