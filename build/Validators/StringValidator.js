"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberValidator = void 0;
const AssertionError_1 = require("../AssertionError");
const AnyValidator_1 = require("./AnyValidator");
class NumberValidator extends AnyValidator_1.AnyValidator {
    _equals = { flag: false, value: '' };
    _min = { flag: false, value: 0 };
    _max = { flag: false, value: 0 };
    _includes = { flag: false, value: '' };
    equals(value) {
        this._equals = { flag: true, value };
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
    includes(value) {
        this._includes = { flag: true, value };
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
        const error = `Expected ${varName} to be a String${this._required.flag ? '' : ' or undefined or null'}`;
        if (value === undefined || value === null) {
            if (this._required.flag)
                throw new AssertionError_1.AssertionError(error, { cause: [`Violated Constraint "Required": Value has to be a String`] });
        }
        else if (typeof value === 'string') {
            if (this._equals.flag) {
                if (value !== this._equals.value)
                    throw new AssertionError_1.AssertionError(error, { cause: [`Violated Constraint "Equals": Value has to be equal to "${this._equals.value}"`] });
            }
            else {
                let causes = [];
                if (this._min.flag && value.length < this._min.value)
                    causes.push(`Violated Constraint "Min": Value has to be longer than or equally long to ${this._min.value} Characters`);
                if (this._max.flag && value.length > this._max.value)
                    causes.push(`Violated Constraint "Max": Value has to be shorter than or equally short to ${this._max.value} Characters`);
                if (this._includes.flag && !value.includes(this._includes.value))
                    causes.push(`Violated Constraint "Includes": Value has to include "${this._includes.value}"`);
                if (causes.length > 0)
                    throw new AssertionError_1.AssertionError(error, { cause: causes });
            }
        }
        else {
            throw new AssertionError_1.AssertionError(error);
        }
    }
}
exports.NumberValidator = NumberValidator;
