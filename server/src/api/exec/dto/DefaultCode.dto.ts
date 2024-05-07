import { IsIn, IsOptional, IsString } from "class-validator";
import { LodashFunctions } from "polygon/types";
import { lodashFnArray } from "./ExecuteCode.dto";

export class DefaultCodeDto {
    @IsString()
    @IsIn(lodashFnArray, {
        message: (args) => `Function ${args.value} is not in the tested list`,
    })
    @IsOptional()
    lodash_fn_name: keyof LodashFunctions;
}
