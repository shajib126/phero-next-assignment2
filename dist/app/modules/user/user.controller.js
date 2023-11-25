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
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const data = yield user_service_1.UserServices.createUserIntoDB(userData);
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
        const data = yield user_service_1.UserServices.updareOrderFromDB(userId, req.body);
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
