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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const fullNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'first Name is required'],
        trim: true,
        maxlength: [20, "Name can not be more than 20 charecter"]
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'last name is required'],
        maxlength: [20, 'Name can not be more than 20 charecter']
    }
});
const addressSchema = new mongoose_1.Schema({
    street: String,
    city: String,
    country: String
});
const orderSchema = new mongoose_1.Schema({
    productName: String,
    price: Number,
    quantity: Number
});
const userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, 'user Id is required'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'user name is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        maxlength: [20, 'password can not be more than 20']
    },
    fullName: fullNameSchema,
    age: {
        type: Number,
        required: [true, 'age is required']
    },
    email: {
        type: String
    },
    hobbies: [],
    address: addressSchema,
    orders: [orderSchema],
    isActive: {
        type: Boolean,
        default: false
    },
}, { versionKey: false });
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcryptjs_1.default.hash(this.password, 10);
        next();
    });
});
userSchema.post('save', function (doc, next) {
    doc.password = '',
        next();
});
userSchema.statics.isFound = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const isfound = yield exports.User.findOne({ userId: id }).select('-password');
        return isfound;
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
