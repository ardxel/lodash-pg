import { config } from "./common";

type PickByType<T, U> = { [P in keyof T]: T[P] extends U ? T[P] : never };

type PickOnlyFunctions<T> = PickByType<T, () => void>;

type LodashNotFnProps = "VERSION" | "bind" | "binkKey" | "memoize" | "partial" | "partialRight" | "templateSettings";

export type LodashFunctions = Omit<PickOnlyFunctions<import("lodash").LoDashStatic>, LodashNotFnProps>;

export type TempJSModule<T extends keyof LodashFunctions = keyof LodashFunctions> = {
    default?: LodashFunctions[T];
};
