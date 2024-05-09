import { Module } from "@nestjs/common";
import { CodeExecutor } from "polygon";
import { CodeGenerator } from "polygon/executor";
import { ExecController } from "./exec.controller";
import { ExecService } from "./exec.service";

@Module({
    controllers: [ExecController],
    providers: [ExecService, CodeExecutor, CodeGenerator],
})
export class ExecModule {}
