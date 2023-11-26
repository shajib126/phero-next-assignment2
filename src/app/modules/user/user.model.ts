import { Schema,model } from "mongoose";
import {TFullName, TUser, TAddress, UserModel, TOrders } from "./user.interface";
import bcrypt from  'bcryptjs'

const fullNameSchema = new Schema<TFullName>({
    firstName:{
        type:String,
        required:[true,'first Name is required'],
        trim:true,
        maxlength:[20,"Name can not be more than 20 charecter"]
    },
  
    lastName:{
        type:String,
        trim:true,
        required:[true,'last name is required'],
        maxlength:[20,'Name can not be more than 20 charecter']
    }
})
const addressSchema = new Schema<TAddress>({
    street:String,
    city:String,
    country:String
})


const orderSchema = new Schema<TOrders>(
    {
        productName:String,
        price:Number,
        quantity:Number
    }
)


const userSchema = new Schema<TUser,UserModel>({
    userId:{
        type:Number,
        required:[true,'user Id is required'],
        unique:true
      
    },
    username:{
        type:String,
        required:[true,'user name is required'],
        unique:true
       
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        maxlength:[20,'password can not be more than 20']
    },
    fullName:fullNameSchema,
   age:{
    type:Number,
    required:[true,'age is required']
   },
    email:{
        type:String
    },
    hobbies:[],
    address:addressSchema,
    orders:[orderSchema],
    isActive:{
        type:Boolean,
        default:false
    },
   
},{versionKey:false})



userSchema.pre('save',async function(next){
    
    this.password = await bcrypt.hash(this.password,10)
    next()
})
userSchema.post('save',function(doc,next){
    doc.password = '',
    next()
})



userSchema.statics.isFound = async function(id:number){
   const isfound = await User.findOne({userId:id}).select('-password')
      return isfound
    
}



export const User = model<TUser,UserModel>('User',userSchema)