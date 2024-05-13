export type PickByType<T, U> = { [P in keyof T]: T[P] extends U ? T[P] : never };

export type PickOnlyFunctions<T> = PickByType<T, () => void>;
