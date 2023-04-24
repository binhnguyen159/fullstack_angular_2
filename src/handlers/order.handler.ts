import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Order } from "../models/order.entity";
import { STATUS } from "../util/contant";

const activeOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRepository = AppDataSource.getRepository(Order);
    const userId = req.params.userId;
    console.log("userId", userId)
    const orders = await userRepository.find({
      relations: {
        user: true
      },
      where: {
        user: {
          id: userId
        },
        status: STATUS.ACTIVE,
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
};

const completedOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRepository = AppDataSource.getRepository(Order);
    const userId = req.params.userId;
    const orders = await userRepository.find({
      // where: {
      //   userId,
      //   status: STATUS.COMPLETED,
      // },
    });
    res.status(200).json(orders);
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
};

export default {
  activeOrders,
  completedOrders,
};
