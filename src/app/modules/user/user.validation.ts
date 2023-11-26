import {z} from 'zod'

const  fullNameSchema =z.object ({
    firstName:z.string().min(1).max(20),
    lastName:z.string().min(1).max(20)
})
export const orderSchema =z.object( {
    
    productName:z.string(),
    price:z.number(),
    quantity:z.number()
})
const  addressSchema =z.object( {
    street:z.string(),
    city:z.string(),
    country:z.string(),
})
export const userValidationSchema =z.object({
    userId:z.number(),
    username:z.string().min(2).max(20),
    password:z.string().min(3).max(20),
    fullName:fullNameSchema,
    age:z.number(),
    email:z.string(),
    hobbies:z.array(z.string()).default([]),
    address:addressSchema,
    orders:z.array(orderSchema).default([]),
    isActive:z.boolean().default(false)
    
})

export default userValidationSchema