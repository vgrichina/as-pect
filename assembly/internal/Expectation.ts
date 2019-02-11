
// @ts-ignore: Decorators *are* valid here
@external("__aspect", "tryCall")
declare function tryCall(func: () => void): bool;

export class Expectation<T> {
  _not: bool = false;
  value: T | null;

  constructor(value: T | null) {
    this.value = value;
  }

  public get not(): Expectation<T> {
    this._not = true;
    return this;
  }

  public toBe(value: T | null, message: string = ""): void {
    // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
    assert(this._not ^ (value == this.value), message);
  }

  public toStrictEqual(value: T | null, message: string = ""): void {
    // fast path, the value is itself
    if (value == this.value) return;
    // fast path, both values aren't null together, so if any of them are null, they do not equal
    // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly

    if (isReference<T>() && (value == null || this.value == null)) {
      assert(this._not, message);
      return;
    }

    // slow path, assert a memcompare
    if (isReference<T>()) {
      let compareResult = memory.compare(
        changetype<usize>(value),
        changetype<usize>(this.value),
        sizeof<T>(),
      );
      // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
      assert(this._not ^ (compareResult == 0), message);
    } else {
      this.toBe(value);
    }
  }

  public toBeTruthy(message: string = ""): void {
    if (this.value instanceof String) {
      // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
      assert(this._not ^ (this.value != null && this.value.length > 0), message);
      return;
    }
    // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
    assert(this._not ^ (!!this.value), message);
  }

  public toBeFalsy(message: string = ""): void {
    if (isReference<T>() && this.value == null) return;
    if (this.value instanceof String) {
      // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
      assert(this._not ^ (this.value.length == 0), message);
      return;
    }
    // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
    assert(this._not ^ (!this.value), message);
  }

  public toThrow(message: string = ""): void {
    // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
    assert(this._not ^ (!tryCall(this.value)), message);
  }

  public toBeGreaterThan(value: T | null, message: string = ""): void {
    if (isReference<T>() && (value == null || this.value == null)) assert(false, message);
    // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
    assert(this._not ^ (this.value > value), message);
  }

  public toBeGreaterThanOrEqualTo(value: T | null, message: string = ""): void {
    if (isReference<T>() && (value == null || this.value == null)) assert(false, message);
    // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
    assert(this._not ^ (this.value >= value), message);
  }

  public toBeLessThan(value: T | null, message: string = ""): void {
    if (isReference<T>() && (value == null || this.value == null)) assert(false, message);
    // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
    assert(this._not ^ (this.value < value), message);
  }

  public toBeLessThanOrEqualTo(value: T | null, message: string = ""): void {
    if (isReference<T>() && (value == null || this.value == null)) assert(false, message);
    // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
    assert(this._not ^ (this.value <= value), message);
  }

  public toBeNull(message: string = ""): void {
    if (isReference<T>()) {
      // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
      assert(this._not ^ (this.value == null), message);
    }
  }
}

export function expect<T>(value: T | null): Expectation<T> {
  return new Expectation<T>(value);
}
