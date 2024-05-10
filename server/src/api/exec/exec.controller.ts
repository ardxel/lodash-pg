import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { TestingResult } from "polygon/executor";
import { LodashEntityDto, ExecuteCodeDto } from "./dto";
import { ExecService } from "./exec.service";

@Controller("exec")
export class ExecController {
    constructor(private readonly execService: ExecService) {}

    @Post()
    public executeCode(@Body() dto: ExecuteCodeDto): Promise<TestingResult> {
        return this.execService.execCode(dto);
    }

    @Get()
    public getImplementedLodashMethodKeys() {
        return this.execService.getImplementedLodashMethodKeys();
    }

    @Get("entity")
    public getEntityOfLodash(@Query() dto: LodashEntityDto) {
        return this.execService.getLodashEntityByName(dto.lodash_fn_name);
    }
}
