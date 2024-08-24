"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectValidator = void 0;
const AssertionError_1 = require("../AssertionError");
const AnyValidator_1 = require("./AnyValidator");
class ObjectValidator extends AnyValidator_1.AnyValidator {
    _schema = { flag: false, value: {} };
    _min = { flag: false, value: 0 };
    _max = { flag: false, value: 0 };
    item(value) {
        this._schema = { flag: true, value };
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
        const error = `Expected ${varName} to be an Object${this._required.flag ? '' : ' or undefined or null'}`;
        if (value === undefined || value === null) {
            if (this._required.flag)
                throw new AssertionError_1.AssertionError(error, { cause: [`Violated Constraint "Required": Value has to be an Object`] });
        }
        else if (Object.prototype.toString.call(value) === '[object Object]') {
            let causes = [];
            if (this._schema.flag) {
                for (const key in this._schema.value) {
                    const validator = this._schema.value[key];
                    try {
                        validator.assert(value[key], `${varName}.${key}`);
                    }
                    catch (e) {
                        causes.push(...e.cause);
                    }
                }
            }
            if (this._min.flag && Object.keys(this._schema.value).length < this._min.value)
                causes.push(`Violated Constraint "Min": Object has to contain more than or exactly ${this._min.value} Elements`);
            if (this._max.flag && Object.keys(this._schema.value).length > this._max.value)
                causes.push(`Violated Constraint "Max": Object has to contain less than or exactly ${this._max.value} Elements`);
            if (causes.length > 0)
                throw new AssertionError_1.AssertionError(error, { cause: causes });
        }
        else {
            throw new AssertionError_1.AssertionError(error);
        }
    }
}
exports.ObjectValidator = ObjectValidator;
