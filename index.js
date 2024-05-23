const app = require("./server");
const sequelize = require("./config/database");
require("./models/product");
require("./models/user");
require("./models/order"); // Importar el modelo de órdenes
require("dotenv").config();

const port = process.env.PORT;

async function main() {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos exitosa.");
    await sequelize.sync({ force: true });
    console.log("Base de datos sincronizada correctamente.");
    app.listen(port, () => console.log("Corriendo en el puerto: " + port));
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
}
main();
