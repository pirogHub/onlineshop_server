import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from "express-session"
import * as passport from "passport"
import { DocumentBuilder } from '@nestjs/swagger';
import cors from "cors"
import { SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(session({
  //   secret: "sdgfdss",
  //   resave: false,
  //   saveUninitialized: false
  // }))
  console.log("process.env.CLIENT_HOST", process.env.CLIENT_HOST);
  const configCors = {
    // credentials: true,
    allowedHeaders: ['Origin', ' X-Requested-With', ' Content-Type', ' Accept', ' Authorization'],
    // origin: [process.env.CLIENT_HOST, "http://localhost:3000", "localhost:3000", "http://localhost:3001"],
    origin: process.env.CLIENT_HOST,
    // origin: "http://localhost:3000",
    // origin: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  }
  // app.use(passport.initialize())
  // app.use(passport.session())
  app.enableCors({ ...configCors })
  // app.use(
  //   cors({
  //     credentials: true,
  //     origin: [process.env.CLIENT_HOST, "http://localhost:3000/", "http://localhost:3001/"], // contains the frontend url
  //     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
  //     allowedHeaders: ["Content-Type", "Authorization"],
  //   })
  // );


  console.log("configCors", configCors);
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
