import { AssertionError } from "../AssertionError";

export class AnyValidator {
	protected _required: { flag: boolean } = { flag: false };

	required(value: boolean = true): this {
		this._required = { flag: value };

		return this;
	}

	validate(value: unknown): value is unknown {
		try {
			this.assert(value);

			return true;
		}
		catch {
			return false;
		}
	}

	assert(value: unknown, varName: string = 'value'): asserts value is unknown {
		if ((value === undefined || value === null) && this._required.flag)
			throw new AssertionError(`Expected ${varName} to not be undefined or null`);
	}
}