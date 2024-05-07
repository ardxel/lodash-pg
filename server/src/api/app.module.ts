import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { validate } from "./env.validation";
import { ExecModule } from "api/exec/exec.module";
import { LoggerMiddleware } from "api/common/middleware";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate,
            envFilePath: [".env"],
        }),
        ExecModule,
    ],
    controllers: [AppController],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes("*");
    }
}
