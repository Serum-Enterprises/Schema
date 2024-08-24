"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberValidator = void 0;
const AssertionError_1 = require("../AssertionError");
const AnyValidator_1 = require("./AnyValidator");
class NumberValidator extends AnyValidator_1.AnyValidator {
    _integer = { flag: false };
    _equals = { flag: false, value: 0 };
    _min = { flag: false, value: 0 };
    _max = { flag: false, value: 0 };
    integer(value = true) {
        this._integer = { flag: value };
        return this;
    }
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
        const error = `Expected ${varName} to be a Number${this._required.flag ? '' : ' or undefined or null'}`;
        if (value === undefined || value === null) {
            if (this._required.flag)
                throw new AssertionError_1.AssertionError(error, { cause: [`Violated Constraint "Required": Value has to be a Number`] });
        }
        else if (typeof value === 'number') {
            if (this._equals.flag) {
                if (value !== this._equals.value)
                    throw new AssertionError_1.AssertionError(error, { cause: [`Violated Constraint "Equals": Value has to be equal to ${this._equals.value}`] });
            }
            else {
                let causes = [];
                if (this._integer.flag && !Number.isInteger(value))
                    causes.push(`Violated Constraint "Integer": Value has to be an Integer`);
                if (this._min.flag && value < this._min.value)
                    causes.push(`Violated Constraint "Min": Value has to be greater than or equal to ${this._min.value}`);
                if (this._max.flag && value > this._max.value)
                    causes.push(`Violated Constraint "Max": Value has to be less than or equal to ${this._max.value}`);
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
