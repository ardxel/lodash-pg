import { plainToInstance } from "class-transformer";
import { IsEnum, IsNumber, Max, Min, validateSync } from "class-validator";

export enum Environment {
    Development = "development",
    Production = "production",
    Provision = "provision",
    Test = "test",
}

class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment;

    @IsNumber()
    @Min(0)
    @Max(65535)
    PORT: number;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
        stopAtFirstError: false,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}
