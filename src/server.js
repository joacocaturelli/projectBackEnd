import "dotenv/config";
import app from "./app.js"; //Importamos la app de express con todas las rutas
import { connectMongo } from "./config/mongo.js";

// connectMongo();

const PORT = process.env.PORT || 3000; //Definimos el puerto para el servidor

app.listen(PORT, () => {
  //Hacemos que la app escuche al puerto
  console.log(`Server running on http://localhost:${PORT}`);
  connectMongo();
});
