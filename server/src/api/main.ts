import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ApiKeyGuard } from "./common/guards";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: { enableImplicitConversion: true },
        }),
    );

    app.useGlobalGuards(new ApiKeyGuard());

    const config = app.get(ConfigService);
    const port = config.get("PORT");

    await app.listen(port);
}
bootstrap();
