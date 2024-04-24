"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const example_controller_1 = require("../controllers/example.controller");
const router = express_1.default.Router();
router.get('/example', example_controller_1.getExample);
router.post('/example', example_controller_1.postExample);
exports.default = router;
