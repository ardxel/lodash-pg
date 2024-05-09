import { Injectable } from "@nestjs/common";
import { CodeExecutor } from "polygon";
import { CodeGenerator, TestingResult } from "polygon/executor";
import { TestMapper } from "polygon/testMapper";
import { ExecuteCodeDto } from "./dto";

@Injectable()
export class ExecService {
    private readonly testMapper = TestMapper;

    constructor(
        private readonly codeExecutor: CodeExecutor,
        private readonly codeGenerator: CodeGenerator,
    ) {}

    public execCode(dto: ExecuteCodeDto): Promise<TestingResult> {
        return this.codeExecutor.execute(dto.code, dto.lodash_fn_name);
    }

    public async getImplementedLodashMethodKeys(): Promise<string[]> {
        return this.testMapper.asArrayImplemented();
    }

    public async getLodashEntityByName(fnName: string) {
        const lodashTestObject = this.testMapper.get(fnName);

        return {
            defaultCode: this.codeGenerator.generateDefaultCode(fnName),
            inputs: lodashTestObject.testCases.map((test) => test.input),
            description: lodashTestObject.description,
            examples: lodashTestObject.examples,
        };
    }
}
