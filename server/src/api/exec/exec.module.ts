import { Module } from "@nestjs/common";
import { ExecController } from "./exec.controller";

@Module({
    controllers: [ExecController],
})
export class ExecModule {}
