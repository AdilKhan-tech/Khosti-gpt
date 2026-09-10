import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import { AppModule } from './app.module.js';
import sequelize from './config/database.js';
import './models/user.model.js';

async function bootstrap() {
  try {
    await sequelize.authenticate();
    console.log(
      'Connection to the database has been established successfully.',
    );

    await sequelize.sync({ alter: true });
    console.log('Database models synced.');

    const app = await NestFactory.create(AppModule);
    app.use(json({ limit: '20mb' }));

    app.enableCors({
      origin: process.env.CLIENT_ORIGIN?.split(',') || [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
      ],
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    const port = process.env.PORT ?? 5000;
    await app.listen(port);
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

await bootstrap();