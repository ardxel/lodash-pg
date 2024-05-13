import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { LodashEntityCollection, LodashFunctions } from "playground";

export class ExecuteCodeDto {
    @IsString()
    @IsIn(LodashEntityCollection.getImplementedKeysAsArray(), {
        message: (args) => `Function ${args.value} is not in the tested list`,
    })
    @IsNotEmpty()
    lodash_fn_name: keyof LodashFunctions;

    @IsString()
    @IsNotEmpty()
    code: string;
}
