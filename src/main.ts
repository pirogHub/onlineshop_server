import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from "express-session"
import * as passport from "passport"
import { DocumentBuilder } from '@nestjs/swagger';

import { SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
    secret: "sdgfdss",
    resave: false,
    saveUninitialized: false
  }))

  app.use(passport.initialize())
  app.use(passport.session())
  app.enableCors({
    credentials: true,
    origin: [process.env.CLIENT_HOST]
  })

  const config = new DocumentBuilder()
    .setTitle('Online Shop')
    .setDescription('api documentation')
    .setVersion('1.0')
    .addTag('api')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
