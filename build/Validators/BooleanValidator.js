"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanValidator = void 0;
const AssertionError_1 = require("../AssertionError");
const AnyValidator_1 = require("./AnyValidator");
class BooleanValidator extends AnyValidator_1.AnyValidator {
    _equals = { flag: false, value: false };
    equals(value) {
        this._equals = { flag: true, value };
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
        else if (typeof value === 'boolean') {
            if (this._equals.flag && value !== this._equals.value)
                throw new AssertionError_1.AssertionError(error, { cause: [`Violated Constraint "Equals": Value has to be equal to ${this._equals.value}`] });
        }
        else {
            throw new AssertionError_1.AssertionError(error);
        }
    }
}
exports.BooleanValidator = BooleanValidator;
