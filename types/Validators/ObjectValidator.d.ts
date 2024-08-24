import { AnyValidator } from "./AnyValidator";
type AssertedType<T> = T extends (value: unknown) => asserts value is infer R ? R : never;
export declare class ObjectValidator<T extends {
    [key: string]: AnyValidator;
}> extends AnyValidator {
    protected _schema: {
        flag: boolean;
        value: T;
    };
    protected _min: {
        flag: boolean;
        value: number;
    };
    protected _max: {
        flag: boolean;
        value: number;
    };
    item(value: T): this;
    min(value: number): this;
    max(value: number): this;
    validate(value: unknown): value is AssertedType<T['assert']>[];
    assert(value: unknown, varName?: string): asserts value is {
        [K in keyof T]: AssertedType<T[K]['assert']>;
    };
}
export {};
