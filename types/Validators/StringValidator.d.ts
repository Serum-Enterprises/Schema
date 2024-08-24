import { AnyValidator } from "./AnyValidator";
export declare class NumberValidator extends AnyValidator {
    protected _equals: {
        flag: boolean;
        value: string;
    };
    protected _min: {
        flag: boolean;
        value: number;
    };
    protected _max: {
        flag: boolean;
        value: number;
    };
    protected _includes: {
        flag: boolean;
        value: string;
    };
    equals(value: string): this;
    min(value: number): this;
    max(value: number): this;
    includes(value: string): this;
    validate(value: unknown): value is string;
    assert(value: unknown, varName?: string): asserts value is string;
}
