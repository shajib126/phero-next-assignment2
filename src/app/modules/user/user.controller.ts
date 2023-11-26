import { Request, Response, response } from "express";
import { UserServices } from "./user.service";
import { User } from "./user.model";
import userValidationSchema, { orderSchema } from "./user.validation";
//

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    
   const zodDat = userValidationSchema.parse(userData)
    const data = await UserServices.createUserIntoDB(zodDat);
    
    
    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data:{
        userId:data.userId,
        userName:data.username,
        fullName:data.fullName,
        age:data.age,
        email:data.email,
        isActive:data.isActive,
        hobbies:data.hobbies,
        address:data.address
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const data = await UserServices.getAllUserIntoDB();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const data = await UserServices.getSingleUserFromDB(userId);
    if (!data) {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found",
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User fetched successfully!",
        data,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
   
    const data = await UserServices.updateDataFromDB(userId, req.body);
    if (!data) {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found",
        },
      });
    } else {
      res.status(201).json({
        success: true,
        message: "user updated successfullty!",
        data,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = await UserServices.deleteDataFromDB(userId);
    if (!data) {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found",
        },
      });
    } else {
      res.status(201).json(data);
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error,
    });
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const zodData = orderSchema.parse(req.body)
    const data = await UserServices.updareOrderFromDB(userId, zodData);
    if (!data) {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found",
        },
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: null,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error,
    });
  }
};

const orderByUserId = async(req:Request,res:Response)=>{
    try {
        const { userId } = req.params;

    const orders = await UserServices.oderByUserFromDB(userId);
    if (!orders) {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found",
        },
      });
    }else{
        res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data:orders
          });
    }
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error,
          });
    }
}

const calculatePrice = async(req:Request,res:Response)=>{
    try {
        const { userId } = req.params;

    const data = await UserServices.calculatePriceFromDB(userId);
    if (!data) {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found",
        },
      });
    }else{
        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data
          });
    }
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error,
          });
    }
}

export const UserControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  updateOrder,
  orderByUserId,
  calculatePrice
};
