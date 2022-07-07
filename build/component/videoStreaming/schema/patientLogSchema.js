"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var dbconfig_1 = __importDefault(require("../../../utils/dbconfig"));
var patients_log = /** @class */ (function (_super) {
    __extends(patients_log, _super);
    function patients_log() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return patients_log;
}(sequelize_1.Model));
patients_log.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    patient_id: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    login_time: {
        type: new sequelize_1.DataTypes.DATE(),
        allowNull: false
    },
    logout_time: {
        type: new sequelize_1.DataTypes.DATE(),
        allowNull: false
    },
    created_at: {
        type: new sequelize_1.DataTypes.DATE(),
        allowNull: false,
        defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
        type: new sequelize_1.DataTypes.DATE(),
        allowNull: false,
        defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    deleted_at: {
        type: new sequelize_1.DataTypes.DATE()
    }
}, {
    sequelize: dbconfig_1.default,
    tableName: 'patients_log',
    timestamps: false
});
exports.default = patients_log;
