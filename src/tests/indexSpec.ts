import orderController from "../controller/order.controller";
import productController from "../controller/product.controller";
import userController from "../controller/user.controller";
import { Order } from "../entities/order.entity";
import { Product } from "../entities/product.entity";
import { User } from "../entities/user.entity";
import { getRepository, createConnection } from "typeorm";
import { v4 as uuid4 } from "uuid";
import { STATUS } from "../util/contant";
import dotenv from "dotenv";
dotenv.config();

describe("Connect Repository", () => {
  beforeAll(() => {
    return createConnection({
      type: "postgres",
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      database: "fantasy_worlds",
      password: process.env.DB_PASSWORD,
      dropSchema: true,
      entities: [User, Product, Order],
      synchronize: true,
      logging: false,
    });
  });
  describe("User Model", () => {
    it("Should have find all user", () => {
      expect(userController.getUsers).toBeDefined();
    });
    it("Should have find user by id", () => {
      expect(userController.getOneUsers).toBeDefined();
    });
    it("Should have add user", () => {
      expect(userController.addUser).toBeDefined();
    });
    it("Find method should get all users", async () => {
      const users = await getRepository(User).find();
      expect(users.length).not.toBeNaN();
    });
    it("Save and FindOne method should create user and find one users", async () => {
      await getRepository(User).save({
        id: uuid4(),
        username: "test",
        password: "test",
      });
      const users = await getRepository(User).findOne({
        where: { username: "test" },
      });
      console.log("users", users);
      expect(users).not.toBeNull();
    });
  });

  describe("Product model", () => {
    it("Should have find all products", () => {
      expect(productController.getProducts).toBeDefined();
    });
    it("Should have find product by id", () => {
      expect(productController.getOneProduct).toBeDefined();
    });
    it("Should have find top 5 product", () => {
      expect(productController.getTop5Product).toBeDefined();
    });
    it("Should have filter product by category", () => {
      expect(productController.filterProductByCategory).toBeDefined();
    });
    it("Find should get all product", async () => {
      const products = await getRepository(Product).find();
      expect(products.length).not.toBeNaN();
    });
    it("Save and FindOne should create and get a product", async () => {
      const newProduct = await getRepository(Product).save({
        id: uuid4(),
        name: "test",
        category: "test",
        price: 50,
      });
      const users = await getRepository(Product).findOne({
        where: { id: newProduct.id },
      });
      expect(users).not.toBeNull();
    });
  });

  describe("Order model", () => {
    it("Should have find all active orders", () => {
      expect(orderController.activeOrders).toBeDefined();
    });
    it("Should have find all completed orders", () => {
      expect(orderController.completedOrders).toBeDefined();
    });
    it("Find method should get all active order", async () => {
      const orders = await getRepository(Order).find({where: {status: STATUS.ACTIVE}});
      expect(orders.length).not.toBeNaN();
    });
    it("Find method should get all completed order", async () => {
      const orders = await getRepository(Order).find({where: {status: STATUS.COMPLETED}});
      expect(orders.length).not.toBeNaN();
    });
  });
});
