import express from "express"; //Importamos express
import * as serverControllers from "../controllers/server.controller.js"; // Importamos los controladores

const router = express.Router(); //Creamos el router con la propiedad Router() de express

router.get("/", serverControllers.serverLive);
router.get("/health", serverControllers.serverHealth);

export default router;
