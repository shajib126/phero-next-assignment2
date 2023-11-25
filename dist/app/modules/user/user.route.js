"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = (0, express_1.default)();
router.post('/users', user_controller_1.UserControllers.createUser).get('/users', user_controller_1.UserControllers.getAllUser).get('/users/:userId', user_controller_1.UserControllers.getSingleUser).put('/users/:userId', user_controller_1.UserControllers.updateUser).delete('/users/:userId', user_controller_1.UserControllers.deleteUser).put('/users/:userId/orders', user_controller_1.UserControllers.updateOrder).get('/users/:userId/orders', user_controller_1.UserControllers.orderByUserId).get('/users/:userId/orders/total-price', user_controller_1.UserControllers.calculatePrice);
exports.UserRoutes = router;
