export declare class AnyValidator {
    protected _required: {
        flag: boolean;
    };
    required(value?: boolean): this;
    validate(value: unknown): value is unknown;
    assert(value: unknown, varName?: string): asserts value is unknown;
}
