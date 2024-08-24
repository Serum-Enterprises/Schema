"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyValidator = void 0;
const AssertionError_1 = require("../AssertionError");
class AnyValidator {
    _required = { flag: false };
    required(value = true) {
        this._required = { flag: value };
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
        if ((value === undefined || value === null) && this._required.flag)
            throw new AssertionError_1.AssertionError(`Expected ${varName} to not be undefined or null`);
    }
}
exports.AnyValidator = AnyValidator;
