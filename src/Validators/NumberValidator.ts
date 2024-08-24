import { AssertionError } from "../AssertionError";
import { AnyValidator } from "./AnyValidator";

export class NumberValidator extends AnyValidator {
	protected _integer: { flag: boolean } = { flag: false };
	protected _equals: { flag: boolean, value: number } = { flag: false, value: 0 };
	protected _min: { flag: boolean, value: number } = { flag: false, value: 0 };
	protected _max: { flag: boolean, value: number } = { flag: false, value: 0 };

	integer(value: boolean = true): this {
		this._integer = { flag: value };

		return this;
	}

	equals(value: number): this {
		this._equals = { flag: true, value };

		return this;
	}

	min(value: number): this {
		this._min = { flag: true, value };

		return this;
	}

	max(value: number): this {
		this._max = { flag: true, value };

		return this;
	}

	override validate(value: unknown): value is number {
		try {
			this.assert(value);

			return true;
		}
		catch {
			return false;
		}
	}

	override assert(value: unknown, varName: string = 'value'): asserts value is number {
		const error = `Expected ${varName} to be a Number${this._required.flag ? '' : ' or undefined or null'}`;

		if (value === undefined || value === null) {
			if (this._required.flag)
				throw new AssertionError(error, { cause: [`Violated Constraint "Required": Value has to be a Number`] });
		}
		else if (typeof value === 'number') {
			if (this._equals.flag) {
				if (value !== this._equals.value)
					throw new AssertionError(error, { cause: [`Violated Constraint "Equals": Value has to be equal to ${this._equals.value}`] });
			}
			else {
				let causes: string[] = [];

				if (this._integer.flag && !Number.isInteger(value))
					causes.push(`Violated Constraint "Integer": Value has to be an Integer`);

				if (this._min.flag && value < this._min.value)
					causes.push(`Violated Constraint "Min": Value has to be greater than or equal to ${this._min.value}`);

				if (this._max.flag && value > this._max.value)
					causes.push(`Violated Constraint "Max": Value has to be less than or equal to ${this._max.value}`);

				if (causes.length > 0)
					throw new AssertionError(error, { cause: causes });
			}
		}
		else {
			throw new AssertionError(error);
		}
	}
}