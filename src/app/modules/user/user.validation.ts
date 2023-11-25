import {z} from 'zod'

const  fullNameSchema =z.object ({
    firstName:z.string().min(1).max(20),
    lastName:z.string().min(1).max(20)
})
const orderSchema =z.object( {
    
    productName:z.string().min(1).max(20),
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
    password:z.string(),
    username:z.string(),
    fullName:fullNameSchema,
    age:z.string(),
    email:z.string(),
    hobbies:z.array(z.string()),
    address:addressSchema,
    orders:z.array(orderSchema),
    isActive:z.boolean().optional().default(false)
    
})

export default userValidationSchema