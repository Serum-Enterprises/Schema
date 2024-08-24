import { AssertionError } from "../AssertionError";
import { AnyValidator } from "./AnyValidator";

type AssertedType<T> = T extends (value: unknown) => asserts value is infer R ? R : never;

export class ArrayValidator<T extends AnyValidator> extends AnyValidator {
	protected _item: { flag: boolean, value: T } = { flag: false, value: new AnyValidator() as T };
	protected _tuple: { flag: boolean, value: T[] } = { flag: false, value: [] };
	protected _min: { flag: boolean, value: number } = { flag: false, value: 0 };
	protected _max: { flag: boolean, value: number } = { flag: false, value: 0 };

	item(value: T): this {
		this._item = { flag: true, value };

		return this;
	}

	tuple(value: T[]): this {
		this._tuple = { flag: true, value };

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

	override validate(value: unknown): value is AssertedType<T['assert']>[] {
		try {
			this.assert(value);

			return true;
		}
		catch {
			return false;
		}
	}

	override assert(value: unknown, varName: string = 'value'): asserts value is AssertedType<T['assert']>[] {
		const error = `Expected ${varName} to be an Array${this._required.flag ? '' : ' or undefined or null'}`;

		if (value === undefined || value === null) {
			if (this._required.flag)
				throw new AssertionError(error, { cause: [`Violated Constraint "Required": Value has to be an Array`] });
		}
		else if (Array.isArray(value)) {
			let causes: string[] = [];

			if (this._item.flag) {
				for (let i = 0; i < value.length; i++) {
					try {
						this._item.value.assert(value[i], `${varName}[${i}]`);
					}
					catch (e) {
						causes.push(...((e as AssertionError).cause as string[]));
					}
				}
			}

			if (this._tuple.flag) {
				if (this._tuple.value.length !== value.length)
					causes.push(`Violated Constraint "Tuple": Value has to have ${this._tuple.value.length} Elements`);
				else {
					for (let i = 0; i < value.length; i++) {
						const validator: T = this._tuple.value[i] as T;

						try {
							validator.assert(value[i], `${varName}[${i}]`);
						}
						catch (e) {
							causes.push(...((e as AssertionError).cause as string[]));
						}
					}
				}
			}

			if (this._min.flag && value.length < this._min.value)
				causes.push(`Violated Constraint "Min": Value has to be longer than or equally long to ${this._min.value} Elements`);

			if (this._max.flag && value.length > this._max.value)
				causes.push(`Violated Constraint "Max": Value has to be shorter than or equally short to ${this._max.value} Elements`);

			if (causes.length > 0)
				throw new AssertionError(error, { cause: causes });

		}
		else {
			throw new AssertionError(error);
		}
	}
}