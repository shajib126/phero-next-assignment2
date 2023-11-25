import { TOrders, TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (userData: TUser) => {
  
  const data = await User.create(userData);
  return data;
};

const getAllUserIntoDB = async () => {
  const data = await User.aggregate([
    { $match: { id: null } },
    {
      $project: {
        _id: 0,
        username: 1,
        fullName: {firstName:1,lastName:1},
        age: 1,
        email: 1,
        address: {street:1,city:1,country:1},
      },
    },
  ]);
  return data;
};

const getSingleUserFromDB = async (userId: string) => {
  const id = parseInt(userId);
  console.log(await User.isFound(id));
  if ((await User.isFound(id)) == null) {
    return false;
  } else {
    const result = await User.aggregate([
      { $match: { userId: id } },
      {
        $project: {
          _id: 0,
          userId: 1,
          username: 1,
          fullName: {firstName:1,lastName:1},
          age: 1,
          email: 1,
          isAcitve: 1,
          hobbies: 1,
          address: {street:1,city:1,country:1},
        },
      },
    ]);
    return result[0];
  }
};

const updateDataFromDB = async (userId: string,updateData:TUser) => {
    const id = parseInt(userId);
    
    if ((await User.isFound(id)) == null) {
      return false;
    } else {
      const data = await User.updateOne({userId:id},{$set:updateData})
      return await User.findOne({userId:id},{userId:1,userName:1,fullName:{firstName:1,lastName:1},age:1,email:1,isActive:1,hobbies:1,address:{street:1,city:1,country:1}})
    }
  };
  

  const deleteDataFromDB = async (userId: string) => {
    const id = parseInt(userId);
    
    if ((await User.isFound(id)) == null) {
      return false;
    } else {
      const data = await User.deleteOne({userId:id})
      return {
        success:true,
        message:"User Deleted successfully!",
        data:null
      } 
    }
  };
  

  const updareOrderFromDB = async (userId: string,updateData:TOrders) => {
    const id = parseInt(userId);
    const {productName,price,quantity} = updateData
    if ((await User.isFound(id)) == null) {
      return false;
    } else {
      const data = await User.findOneAndUpdate({userId:id},{$push:{
        orders:{
            productName,
            price,
            quantity
        }
      }},{new:true})
     
      return data
    }
  };
  
  const oderByUserFromDB = async(userId:string)=>{
    const id = parseInt(userId);
    if ((await User.isFound(id)) == null) {
        return false;
      }else{
        const data = await User.aggregate([{$match:{userId:id}},{ $unwind: '$orders' },{$group:{_id:null,orders:{$push:'$orders'}}},{$project:{_id:0,orders:"$orders"}}])
        return data[0]
      }
  }

  const calculatePriceFromDB = async(userId:string)=>{
    const id = parseInt(userId);
    if ((await User.isFound(id)) == null) {
        return false;
      }else{
       const totalPrice = await User.aggregate([{$match:{userId:id}},{
        $unwind:'$orders'
       },{$group:{_id:'$userId',total:{$sum:{$multiply:['$orders.price','$orders.quantity']}}}},{$project:{_id:0,totalPrice:'$total'}}])
       return totalPrice[0]
      }
  }

export const UserServices = {
  createUserIntoDB,
  getAllUserIntoDB,
  getSingleUserFromDB,
  updateDataFromDB,
  deleteDataFromDB,
  updareOrderFromDB,
  oderByUserFromDB,
  calculatePriceFromDB
};
