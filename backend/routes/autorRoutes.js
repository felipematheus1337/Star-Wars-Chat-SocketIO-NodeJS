import express from "express"
import AutorController from "../controller/AutorController.js"

const autorRouter = express.Router();

autorRouter.get("/autor",AutorController.getAllMsgs)
autorRouter.post("/autor",AutorController.postMessage)


export default autorRouter;