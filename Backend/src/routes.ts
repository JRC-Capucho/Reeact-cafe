import { Router } from "express";
import { UserController } from "./controllers/user/UserController";
import { AuthController } from "./controllers/user/auth/AuthController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CategoryController } from "./controllers/category/CategoryController";
import { ProductController } from "./controllers/product/ProductController";

import multer from "multer";
import uploadConfig from "./config/multer";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// ROUTES FOR USER
router.post("/user/create", new UserController().create); // Create
router.post("/user/login", new AuthController().signin); // Authenticated
router.get("/user/me", isAuthenticated, new UserController().detailUser); // information user

// ROUTES FOR CATEGORY
router.post(
  "/category/create",
  isAuthenticated,
  new CategoryController().create,
);

router.get("/category", isAuthenticated, new CategoryController().list);

// ROUTES FOR PRODUCTS
router.post(
  "/product/create",
  isAuthenticated,
  upload.single("file"),
  new ProductController().create,
);

export { router };
