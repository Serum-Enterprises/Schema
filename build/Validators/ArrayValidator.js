"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayValidator = void 0;
const AssertionError_1 = require("../AssertionError");
const AnyValidator_1 = require("./AnyValidator");
class ArrayValidator extends AnyValidator_1.AnyValidator {
    _item = { flag: false, value: new AnyValidator_1.AnyValidator() };
    _tuple = { flag: false, value: [] };
    _min = { flag: false, value: 0 };
    _max = { flag: false, value: 0 };
    item(value) {
        this._item = { flag: true, value };
        return this;
    }
    tuple(value) {
        this._tuple = { flag: true, value };
        return this;
    }
    min(value) {
        this._min = { flag: true, value };
        return this;
    }
    max(value) {
        this._max = { flag: true, value };
        return this;
    }
    validate(value) {
        try {
            this.assert(value);
            return true;
        }
        catch {
            return false;
        }
    }
    assert(value, varName = 'value') {
        const error = `Expected ${varName} to be an Array${this._required.flag ? '' : ' or undefined or null'}`;
        if (value === undefined || value === null) {
            if (this._required.flag)
                throw new AssertionError_1.AssertionError(error, { cause: [`Violated Constraint "Required": Value has to be an Array`] });
        }
        else if (Array.isArray(value)) {
            let causes = [];
            if (this._item.flag) {
                for (let i = 0; i < value.length; i++) {
                    try {
                        this._item.value.assert(value[i], `${varName}[${i}]`);
                    }
                    catch (e) {
                        causes.push(...e.cause);
                    }
                }
            }
            if (this._tuple.flag) {
                if (this._tuple.value.length !== value.length)
                    causes.push(`Violated Constraint "Tuple": Value has to have ${this._tuple.value.length} Elements`);
                else {
                    for (let i = 0; i < value.length; i++) {
                        const validator = this._tuple.value[i];
                        try {
                            validator.assert(value[i], `${varName}[${i}]`);
                        }
                        catch (e) {
                            causes.push(...e.cause);
                        }
                    }
                }
            }
            if (this._min.flag && value.length < this._min.value)
                causes.push(`Violated Constraint "Min": Value has to be longer than or equally long to ${this._min.value} Elements`);
            if (this._max.flag && value.length > this._max.value)
                causes.push(`Violated Constraint "Max": Value has to be shorter than or equally short to ${this._max.value} Elements`);
            if (causes.length > 0)
                throw new AssertionError_1.AssertionError(error, { cause: causes });
        }
        else {
            throw new AssertionError_1.AssertionError(error);
        }
    }
}
exports.ArrayValidator = ArrayValidator;
