import "dotenv/config";
import { env } from "./config/env.js";
import { connectMongo } from "./config/mongo.js";
import app from "./app.js"; //Importamos la app de express con todas las rutas

connectMongo();

app.listen(env.PORT, () => {
  //Hacemos que la app escuche al puerto
  console.log(`Server running on http://localhost:${env.PORT}`);
});
