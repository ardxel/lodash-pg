import { Test, TestingModule } from "@nestjs/testing";
import { CodeExecutor } from "polygon";
import { CodeGenerator } from "polygon/executor";
import { TestMapper } from "polygon/testMapper";
import { ExecController } from "../exec.controller";
import { ExecService } from "../exec.service";

describe("ExecController", () => {
    let controller: ExecController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ExecController],

            providers: [ExecService, CodeExecutor, TestMapper, CodeGenerator],
        }).compile();

        controller = module.get<ExecController>(ExecController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
