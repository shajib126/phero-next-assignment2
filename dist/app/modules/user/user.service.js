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
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_model_1.User.create(userData);
    return data;
});
const getAllUserIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_model_1.User.aggregate([
        { $match: { id: null } },
        {
            $project: {
                _id: 0,
                username: 1,
                fullName: { firstName: 1, lastName: 1 },
                age: 1,
                email: 1,
                address: { street: 1, city: 1, country: 1 },
            },
        },
    ]);
    return data;
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(userId);
    console.log(yield user_model_1.User.isFound(id));
    if ((yield user_model_1.User.isFound(id)) == null) {
        return false;
    }
    else {
        const result = yield user_model_1.User.aggregate([
            { $match: { userId: id } },
            {
                $project: {
                    _id: 0,
                    userId: 1,
                    username: 1,
                    fullName: { firstName: 1, lastName: 1 },
                    age: 1,
                    email: 1,
                    isAcitve: 1,
                    hobbies: 1,
                    address: { street: 1, city: 1, country: 1 },
                },
            },
        ]);
        return result[0];
    }
});
const updateDataFromDB = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(userId);
    if ((yield user_model_1.User.isFound(id)) == null) {
        return false;
    }
    else {
        const data = yield user_model_1.User.updateOne({ userId: id }, { $set: updateData });
        return yield user_model_1.User.findOne({ userId: id }, { userId: 1, userName: 1, fullName: { firstName: 1, lastName: 1 }, age: 1, email: 1, isActive: 1, hobbies: 1, address: { street: 1, city: 1, country: 1 } });
    }
});
const deleteDataFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(userId);
    if ((yield user_model_1.User.isFound(id)) == null) {
        return false;
    }
    else {
        const data = yield user_model_1.User.deleteOne({ userId: id });
        return {
            success: true,
            message: "User Deleted successfully!",
            data: null
        };
    }
});
const updareOrderFromDB = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(userId);
    const { productName, price, quantity } = updateData;
    if ((yield user_model_1.User.isFound(id)) == null) {
        return false;
    }
    else {
        const data = yield user_model_1.User.findOneAndUpdate({ userId: id }, { $push: {
                orders: {
                    productName,
                    price,
                    quantity
                }
            } }, { new: true });
        return data;
    }
});
const oderByUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(userId);
    if ((yield user_model_1.User.isFound(id)) == null) {
        return false;
    }
    else {
        const data = yield user_model_1.User.aggregate([{ $match: { userId: id } }, { $unwind: '$orders' }, { $group: { _id: null, orders: { $push: '$orders' } } }, { $project: { _id: 0, orders: "$orders" } }]);
        return data[0];
    }
});
const calculatePriceFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(userId);
    if ((yield user_model_1.User.isFound(id)) == null) {
        return false;
    }
    else {
        const totalPrice = yield user_model_1.User.aggregate([{ $match: { userId: id } }, {
                $unwind: '$orders'
            }, { $group: { _id: '$userId', total: { $sum: { $multiply: ['$orders.price', '$orders.quantity'] } } } }, { $project: { _id: 0, totalPrice: '$total' } }]);
        return totalPrice[0];
    }
});
exports.UserServices = {
    createUserIntoDB,
    getAllUserIntoDB,
    getSingleUserFromDB,
    updateDataFromDB,
    deleteDataFromDB,
    updareOrderFromDB,
    oderByUserFromDB,
    calculatePriceFromDB
};
