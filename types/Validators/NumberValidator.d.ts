import { AnyValidator } from "./AnyValidator";
export declare class NumberValidator extends AnyValidator {
    protected _integer: {
        flag: boolean;
    };
    protected _equals: {
        flag: boolean;
        value: number;
    };
    protected _min: {
        flag: boolean;
        value: number;
    };
    protected _max: {
        flag: boolean;
        value: number;
    };
    integer(value?: boolean): this;
    equals(value: number): this;
    min(value: number): this;
    max(value: number): this;
    validate(value: unknown): value is number;
    assert(value: unknown, varName?: string): asserts value is number;
}
