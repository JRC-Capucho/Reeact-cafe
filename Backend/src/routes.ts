import { Router, Response, Request } from "express";

const router = Router();

router.get("/teste", (req: Request, res: Response) => {
  throw new Error("Error");
});

router.get("/users");
router.get("/user/:id");
router.post("/user/create");
router.put("/user/update/:id");
router.delete("/user/delete/:id");

export { router };
