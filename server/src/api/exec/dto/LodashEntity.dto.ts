import { IsIn, IsOptional, IsString } from "class-validator";
import { LodashEntityCollection, LodashFunctions } from "playground";

export class LodashEntityDto {
    @IsString()
    @IsIn(LodashEntityCollection.getImplementedKeysAsArray(), {
        message: (args) => `Function ${args.value} is not in the tested list`,
    })
    @IsOptional()
    lodash_fn_name: keyof LodashFunctions;
}
