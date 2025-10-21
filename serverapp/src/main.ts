import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { join } from 'path';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Serve Next.js static files from 'public'
  server.use(express.static(join(__dirname, '../clientapp/public')));
  
  // Serve Next.js build files (_next)
  server.use('/_next', express.static(join(__dirname, '../clientapp/.next')));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
