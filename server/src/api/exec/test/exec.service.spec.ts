import { Test, TestingModule } from "@nestjs/testing";
import { CodeExecutor } from "polygon";
import { CodeGenerator } from "polygon/executor";
import { TestMapper } from "polygon/testMapper";
import { ExecService } from "../exec.service";

describe("ExecService", () => {
    let service: ExecService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ExecService, CodeExecutor, TestMapper, CodeGenerator],
        }).compile();

        service = module.get<ExecService>(ExecService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
