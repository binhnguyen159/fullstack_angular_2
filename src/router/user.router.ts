import { NextFunction } from "connect";
import express, { Request, Response } from "express";
import { v1 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import AppDataSource from "../db/appDataSource";
import { User } from "../entities/user.entity";

import userController from "../controller/user.controller";
import { verifyAuthToken } from "../middleware/verifyToken";

const router = express.Router();

router.post("/signup", userController.signupAccount);
router.post("/login", userController.loginAccount);
router.get("/auth", verifyAuthToken, userController.getUsers);
router.get("/auth/:id", verifyAuthToken, userController.getOneUsers);
router.get("/auth/add/user", verifyAuthToken, userController.addUser);

export default router;
