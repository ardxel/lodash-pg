import { Injectable } from "@nestjs/common";
import { CodeExecutor } from "polygon";
import { CodeGenerator, TestingResult } from "polygon/executor";
import { TestMapper } from "polygon/testMapper";
import { ExecuteCodeDto } from "./dto";

@Injectable()
export class ExecService {
    constructor(
        private readonly codeExecutor: CodeExecutor,
        private readonly testMapper: TestMapper,
        private readonly codeGenerator: CodeGenerator,
    ) {}

    public execCode(dto: ExecuteCodeDto): Promise<TestingResult> {
        return this.codeExecutor.execute(dto.code, dto.lodash_fn_name);
    }

    public async getImplementedLodashMethodKeys(): Promise<string[]> {
        return this.testMapper.asArrayImplemented();
    }

    public async getDefaultCode(fnName: string): Promise<{ generatedCode: string }> {
        return this.codeGenerator.generateDefaultCode(fnName);
    }
}
