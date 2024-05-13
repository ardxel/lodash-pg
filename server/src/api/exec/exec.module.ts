import { Module } from "@nestjs/common";
import { CodeExecutor } from "playground";
import { CodeGenerator } from "playground/executor";
import { ExecController } from "./exec.controller";
import { ExecService } from "./exec.service";

@Module({
    controllers: [ExecController],
    providers: [ExecService, CodeExecutor, CodeGenerator],
})
export class ExecModule {}
