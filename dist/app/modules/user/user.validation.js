"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = exports.orderSchema = void 0;
const zod_1 = require("zod");
const fullNameSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(20),
    lastName: zod_1.z.string().min(1).max(20)
});
exports.orderSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number()
});
const addressSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
});
exports.userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string().min(2).max(20),
    password: zod_1.z.string().min(3).max(20),
    fullName: fullNameSchema,
    age: zod_1.z.number(),
    email: zod_1.z.string(),
    hobbies: zod_1.z.array(zod_1.z.string()).default([]),
    address: addressSchema,
    orders: zod_1.z.array(exports.orderSchema).default([]),
    isActive: zod_1.z.boolean().default(false)
});
exports.default = exports.userValidationSchema;
