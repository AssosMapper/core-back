import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * The ValidationPipe is a built-in pipe that uses the class-validator library to perform validation on the incoming request payload.
   */
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
    }),
  );
  /**
   * Documentation using Swagger
   */
  const options = new DocumentBuilder()
    .setTitle('Join Us API')
    .setDescription(
      "Api for Join Us, a platform for sharing association'sevents.",
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
