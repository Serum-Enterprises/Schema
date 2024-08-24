import { AssertionError } from "../AssertionError";
import { AnyValidator } from "./AnyValidator";

export class NumberValidator extends AnyValidator {
	protected _equals: { flag: boolean, value: string } = { flag: false, value: '' };
	protected _min: { flag: boolean, value: number } = { flag: false, value: 0 };
	protected _max: { flag: boolean, value: number } = { flag: false, value: 0 };
	protected _includes: { flag: boolean, value: string } = { flag: false, value: '' };

	equals(value: string): this {
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

	includes(value: string): this {
		this._includes = { flag: true, value };

		return this;
	}

	override validate(value: unknown): value is string {
		try {
			this.assert(value);

			return true;
		}
		catch {
			return false;
		}
	}

	override assert(value: unknown, varName: string = 'value'): asserts value is string {
		const error = `Expected ${varName} to be a String${this._required.flag ? '' : ' or undefined or null'}`;

		if (value === undefined || value === null) {
			if (this._required.flag)
				throw new AssertionError(error, { cause: [`Violated Constraint "Required": Value has to be a String`] });
		}
		else if (typeof value === 'string') {
			if (this._equals.flag) {
				if (value !== this._equals.value)
					throw new AssertionError(error, { cause: [`Violated Constraint "Equals": Value has to be equal to "${this._equals.value}"`] });
			}
			else {
				let causes: string[] = [];

				if (this._min.flag && value.length < this._min.value)
					causes.push(`Violated Constraint "Min": Value has to be longer than or equally long to ${this._min.value} Characters`);

				if (this._max.flag && value.length > this._max.value)
					causes.push(`Violated Constraint "Max": Value has to be shorter than or equally short to ${this._max.value} Characters`);

				if (this._includes.flag && !value.includes(this._includes.value))
					causes.push(`Violated Constraint "Includes": Value has to include "${this._includes.value}"`);

				if (causes.length > 0)
					throw new AssertionError(error, { cause: causes });
			}
		}
		else {
			throw new AssertionError(error);
		}
	}
}