import { Model } from "mongoose";

export type TFullName = {
    firstName:string;
    lastName:string;
}
export type TOrders = {
    productName:string;
    price:number;
    quantity:number
}
export type TAddress = {
    street:string;
    city:string;
    country:string;
}
export type TUser = {
    userId:number;
    password:string;
    username:string;
    fullName:TFullName;
    age:string;
    email:string;
    hobbies:string[];
    address:TAddress;
    orders:[TOrders];
    isActive:boolean;
    
}


export interface UserModel extends Model<TUser>{
    isFound(id:number):Promise<TUser | null>
}