import { AnyValidator } from "./AnyValidator";
export declare class BooleanValidator extends AnyValidator {
    protected _equals: {
        flag: boolean;
        value: boolean;
    };
    equals(value: boolean): this;
    validate(value: unknown): value is boolean;
    assert(value: unknown, varName?: string): asserts value is boolean;
}
