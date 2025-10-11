import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
const router = Router()

router.route("/register").post(
    upload.fields([//middleware
        {
            name: "avatar",
            maxCount: 1
        },//obj 1
        {
            name: "coverImage",
            maxCount: 1
        }//obj 2
    ]),
    registerUser)
//can be router.route("/login").post(login)
export default router;