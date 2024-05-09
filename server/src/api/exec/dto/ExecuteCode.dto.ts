import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { TestMapper } from "polygon/testMapper";
import { LodashFunctions } from "polygon/types";

export const lodashFnArray = TestMapper.asArrayImplemented();

export class ExecuteCodeDto {
    @IsString()
    @IsIn(lodashFnArray, {
        message: (args) => `Function ${args.value} is not in the tested list`,
    })
    @IsNotEmpty()
    lodash_fn_name: keyof LodashFunctions;

    @IsString()
    @IsNotEmpty()
    code: string;
}
