import { Router } from "express";

// CONTROLLERS
import { UserController } from "./controllers/user/UserController";
import { AuthController } from "./controllers/user/auth/AuthController";
import { CategoryController } from "./controllers/category/CategoryController";
import { ProductController } from "./controllers/product/ProductController";
import { OrderController } from "./controllers/order/OrderController";
import { ItemController } from "./controllers/item/ItemController";

// MIDDLEWARES
import { isAuthenticated } from "./middlewares/isAuthenticated";

import multer from "multer";
import uploadConfig from "./config/multer";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// USER
router.post("/user/create", new UserController().create); // Create
router.post("/user/login", new AuthController().signin); // Authenticated
router.get("/user/me", isAuthenticated, new UserController().detailUser); // information user

// CATEGORY
router.post(
  "/category/create",
  isAuthenticated,
  new CategoryController().create,
);

router.get("/category", isAuthenticated, new CategoryController().list);

// PRODUCTS
router.post(
  "/product/create",
  isAuthenticated,
  upload.single("file"),
  new ProductController().create,
);

router.get(
  "/products",
  isAuthenticated,
  new ProductController().listForGategory,
);

// ORDER
router.get("/order", isAuthenticated, new OrderController().orders);
router.post("/order/create", isAuthenticated, new OrderController().create);
router.delete("/order/delete", isAuthenticated, new OrderController().delete);
router.put(
  "/order/sendOrder",
  isAuthenticated,
  new OrderController().sendOrder,
);
router.put("/order/finish", isAuthenticated, new OrderController().finishOrder);

// ITEM
router.post("/item/create", isAuthenticated, new ItemController().create);
router.delete("/item/delete", isAuthenticated, new ItemController().delete);
router.get(
  "/order/describe",
  isAuthenticated,
  new ItemController().getOrderById,
);

export { router };
