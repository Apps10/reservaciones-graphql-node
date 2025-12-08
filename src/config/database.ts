import { Sequelize } from "sequelize";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "./envs";

export const sequelizeClient = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
});


export async function connectDB() {
  try {
    await sequelizeClient.authenticate();
    await sequelizeClient.sync({ force: true }); //solo para desarrollo
    
    console.log('📌 Conectado a MySQL correctamente');
  } catch (error) {
    console.error('❌ Error al conectar a MySQL:', error);
    process.exit(1); // evita errores silenciosos
  }
}