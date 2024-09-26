// lib/prisma.ts

import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
// This avoids exhausting your database connections during hot reloading.
// For more details: https://www.prisma.io/docs/guides/database/connection-issues#serverless-functions-and-connection-pooling


declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

export const prisma =
    global.prisma ||
    new PrismaClient({
        log: ['query'], // Enable query logging for debugging; remove or adjust in production
    });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
