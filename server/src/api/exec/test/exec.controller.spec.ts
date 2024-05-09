import { Test, TestingModule } from "@nestjs/testing";
import { CodeExecutor } from "polygon";
import { CodeGenerator } from "polygon/executor";
import { ExecController } from "../exec.controller";
import { ExecService } from "../exec.service";

describe("ExecController", () => {
    let controller: ExecController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ExecController],

            providers: [ExecService, CodeExecutor, CodeGenerator],
        }).compile();

        controller = module.get<ExecController>(ExecController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
