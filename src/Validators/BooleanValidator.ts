import { AssertionError } from "../AssertionError";
import { AnyValidator } from "./AnyValidator";

export class BooleanValidator extends AnyValidator {
	protected _equals: { flag: boolean, value: boolean } = { flag: false, value: false };

	equals(value: boolean): this {
		this._equals = { flag: true, value };

		return this;
	}

	override validate(value: unknown): value is boolean {
		try {
			this.assert(value);

			return true;
		}
		catch {
			return false;
		}
	}

	override assert(value: unknown, varName: string = 'value'): asserts value is boolean {
		const error = `Expected ${varName} to be a Number${this._required.flag ? '' : ' or undefined or null'}`;

		if (value === undefined || value === null) {
			if (this._required.flag)
				throw new AssertionError(error, { cause: [`Violated Constraint "Required": Value has to be a Number`] });
		}
		else if (typeof value === 'boolean') {
			if (this._equals.flag && value !== this._equals.value)
				throw new AssertionError(error, { cause: [`Violated Constraint "Equals": Value has to be equal to ${this._equals.value}`] });
		}
		else {
			throw new AssertionError(error);
		}
	}
}