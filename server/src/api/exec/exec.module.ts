import { Module } from "@nestjs/common";
import { CodeExecutor } from "polygon";
import { CodeGenerator } from "polygon/executor";
import { TestMapper } from "polygon/testMapper";
import { ExecController } from "./exec.controller";
import { ExecService } from "./exec.service";

@Module({
    controllers: [ExecController],
    providers: [ExecService, CodeExecutor, TestMapper, CodeGenerator],
})
export class ExecModule {}
