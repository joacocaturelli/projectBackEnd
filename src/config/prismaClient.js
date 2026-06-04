import { PrismaClient } from "@prisma/client"; // Es la herramienta principal de Prisma para hacer peticiones
import { PrismaPg } from "@prisma/adapter-pg"; // Adaptador de prisma para postgreSQL

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL }); // Pasamos la URL desde la carpeta .env
const prisma = new PrismaClient({ adapter });

export default prisma;
