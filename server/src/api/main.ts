import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: false }));

    const config = app.get(ConfigService);
    const port = config.get("PORT");

    await app.listen(port);
}
bootstrap();
