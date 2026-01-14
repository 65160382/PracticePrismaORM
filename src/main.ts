import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,             //ตัด field ที่ไม่ได้อยู่ใน DTO ทิ้ง
      forbidNonWhitelisted: true,  //ถ้าส่ง field แปลกเข้ามา → error
      transform: true,             //แปลง type อัตโนมัติ เช่น string → number
    }),
  );
    await app.listen(process.env.PORT ?? 3000);
  console.log('Server is running at http://localhost:3000');
}
bootstrap();
