import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { config as pConfig } from "polygon/common";
import { LodashFunctions } from "polygon/types";

const lodashFnArray = Array.from(pConfig.lodashFnSet);

export class ExecuteCodeDto {
    @IsString()
    @IsIn(lodashFnArray, {
        message: (args) => args.value,
    })
    @IsNotEmpty()
    lodash_fn_name: keyof LodashFunctions;

    @IsString()
    @IsNotEmpty()
    code: string;
}
