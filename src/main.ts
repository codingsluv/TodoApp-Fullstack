import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: " http://localhost:5173",
    methods: "GET,HEAD,POST,PUT,DELETE",
    credentials: true
  })

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // menghapus properti yang tidak ada di DTO
    forbidNonWhitelisted: true, // menolak permintaan yang mengirim properti yang tidak ada di DTO
    transform: true, // mengonversi tipe data permintaan ke tipe data yang diharapkan
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
