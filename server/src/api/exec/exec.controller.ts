import { Body, Controller, Post } from "@nestjs/common";
import { ExecuteCodeDto } from "./dto";
import { CodeExecutor } from "polygon";

@Controller("exec")
export class ExecController {
    private codeExecutor = new CodeExecutor();

    @Post()
    public async executeCode(@Body() dto: ExecuteCodeDto) {
        console.log(dto);
        return this.codeExecutor.execute(dto.code, dto.lodash_fn_name);
    }
}
