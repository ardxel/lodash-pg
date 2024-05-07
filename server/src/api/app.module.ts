import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerMiddleware } from "api/common/middleware";
import { ExecModule } from "api/exec/exec.module";
import { validate } from "./env.validation";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validate,
            envFilePath: [".env"],
        }),
        ExecModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes("*");
    }
}
