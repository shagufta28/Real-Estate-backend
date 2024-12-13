import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// Log connection status for debugging
prisma.$connect()
  .then(() => console.log('Database connected successfully'))
  .catch((error) => {
    console.error('Failed to connect to the database:', error.message);
    process.exit(1);
  });
