import { AssertionError } from "../AssertionError";
import { AnyValidator } from "./AnyValidator";

type AssertedType<T> = T extends (value: unknown) => asserts value is infer R ? R : never;

export class ObjectValidator<T extends { [key: string]: AnyValidator }> extends AnyValidator {
	protected _schema: { flag: boolean, value: T } = { flag: false, value: {} as T };
	protected _min: { flag: boolean, value: number } = { flag: false, value: 0 };
	protected _max: { flag: boolean, value: number } = { flag: false, value: 0 };

	item(value: T): this {
		this._schema = { flag: true, value };

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

	override assert(value: unknown, varName: string = 'value'): asserts value is {
		[K in keyof T]: AssertedType<T[K]['assert']>;
	} {
		const error = `Expected ${varName} to be an Object${this._required.flag ? '' : ' or undefined or null'}`;

		if (value === undefined || value === null) {
			if (this._required.flag)
				throw new AssertionError(error, { cause: [`Violated Constraint "Required": Value has to be an Object`] });
		}
		else if (Object.prototype.toString.call(value) === '[object Object]') {
			let causes: string[] = [];

			if (this._schema.flag) {
				for (const key in this._schema.value) {
					const validator: T[Extract<keyof T, string>] = this._schema.value[key];

					try {
						validator.assert((value as any)[key], `${varName}.${key}`);
					}
					catch (e) {
						causes.push(...((e as AssertionError).cause as string[]));
					}
				}
			}

			if (this._min.flag && Object.keys(this._schema.value).length < this._min.value)
				causes.push(`Violated Constraint "Min": Object has to contain more than or exactly ${this._min.value} Elements`);

			if (this._max.flag && Object.keys(this._schema.value).length > this._max.value)
				causes.push(`Violated Constraint "Max": Object has to contain less than or exactly ${this._max.value} Elements`);

			if (causes.length > 0)
				throw new AssertionError(error, { cause: causes });

		}
		else {
			throw new AssertionError(error);
		}
	}
}