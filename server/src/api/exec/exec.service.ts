import { Injectable } from "@nestjs/common";
import { CodeExecutor, LodashEntityCollection } from "playground";
import { CodeGenerator, TestingResult } from "playground/executor";
import { ExecuteCodeDto } from "./dto";

@Injectable()
export class ExecService {
    constructor(
        private readonly codeExecutor: CodeExecutor,
        private readonly codeGenerator: CodeGenerator,
    ) {}

    public execCode(dto: ExecuteCodeDto): Promise<TestingResult> {
        return this.codeExecutor.execute(dto.code, dto.lodash_fn_name);
    }

    public async getImplementedLodashMethodKeys(): Promise<string[]> {
        return LodashEntityCollection.getImplementedKeysAsArray();
    }

    public async getLodashEntityByName(fnName: string) {
        const lodashTestObject = LodashEntityCollection.get(fnName);

        return {
            defaultCode: this.codeGenerator.generateDefaultCode(fnName),
            inputs: lodashTestObject.testCases.map((test) => test.input),
            description: lodashTestObject.description,
            examples: lodashTestObject.examples,
        };
    }
}
