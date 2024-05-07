import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { lodashFnArray } from "./ExecuteCode.dto";
import { LodashFunctions } from "polygon/types";

export class DefaultCodeDto {
    @IsString()
    @IsIn(lodashFnArray, {
        message: (args) => `Function ${args.value} is not in the tested list`,
    })
    @IsOptional()
    lodash_fn_name: keyof LodashFunctions;
}
