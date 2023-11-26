"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = __importStar(require("./user.validation"));
//
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const zodDat = user_validation_1.default.parse(userData);
        const data = yield user_service_1.UserServices.createUserIntoDB(zodDat);
        res.status(201).json({
            success: true,
            message: "User created successfully!",
            data: {
                userId: data.userId,
                userName: data.username,
                fullName: data.fullName,
                age: data.age,
                email: data.email,
                isActive: data.isActive,
                hobbies: data.hobbies,
                address: data.address
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error,
        });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield user_service_1.UserServices.getAllUserIntoDB();
        res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error,
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const data = yield user_service_1.UserServices.getSingleUserFromDB(userId);
        if (!data) {
            res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found",
                },
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User fetched successfully!",
                data,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error,
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const data = yield user_service_1.UserServices.updateDataFromDB(userId, req.body);
        if (!data) {
            res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found",
                },
            });
        }
        else {
            res.status(201).json({
                success: true,
                message: "user updated successfullty!",
                data,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error,
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const data = yield user_service_1.UserServices.deleteDataFromDB(userId);
        if (!data) {
            res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found",
                },
            });
        }
        else {
            res.status(201).json(data);
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error,
        });
    }
});
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const zodData = user_validation_1.orderSchema.parse(req.body);
        const data = yield user_service_1.UserServices.updareOrderFromDB(userId, zodData);
        if (!data) {
            res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found",
                },
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: null,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error,
        });
    }
});
const orderByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const orders = yield user_service_1.UserServices.oderByUserFromDB(userId);
        if (!orders) {
            res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found",
                },
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Order fetched successfully!",
                data: orders
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error,
        });
    }
});
const calculatePrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const data = yield user_service_1.UserServices.calculatePriceFromDB(userId);
        if (!data) {
            res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found",
                },
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Total price calculated successfully!",
                data
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error,
        });
    }
});
exports.UserControllers = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
    updateOrder,
    orderByUserId,
    calculatePrice
};
