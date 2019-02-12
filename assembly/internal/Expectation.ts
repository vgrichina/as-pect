
// @ts-ignore: Decorators *are* valid here
@external("__aspect", "tryCall")
declare function tryCall(func: () => void): bool;


// @ts-ignore: Decorators *are* valid here!
@external("__aspect", "reportExpectedValue")
declare function reportExpectedValue<T>(actual: T, expected: T, negated: bool): void;

// @ts-ignore: Decorators *are* valid here!
@external("__aspect", "reportExpectedReference")
declare function reportExpectedReference<T>(actual: T, expected: T, offset: i32, negated: bool): void;

// @ts-ignore: Decorators *are* valid here
@global
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

  @inline
  public toBe(value: T | null, message: string = ""): void {
    this.report(value);
    // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
    assert(this._not ^ (value == this.value), message);
  }

  @inline
  public toStrictEqual(value: T | null, message: string = ""): void {
    this.report(value);

    // fast path, the value is itself
    if (value == this.value) {
      assert(!this._not, message);
      return;
    }

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
        offsetof<T>(),
      );
      // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
      assert(this._not ^ (compareResult == 0), message);
    } else {
      this.toBe(value);
    }
  }

  @inline
  public toBeTruthy(message: string = ""): void {
    reportExpectedValue<bool>(false, true, this._not);

    if (this.value instanceof String) {
      // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
      assert(this._not ^ (this.value != null && this.value.length > 0), message);
      return;
    }
    // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
    assert(this._not ^ (!!this.value), message);
  }

  @inline
  public toBeFalsy(message: string = ""): void {
    this.report(null);
    if (isReference<T>() && this.value == null) return;
    if (this.value instanceof String) {
      // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
      assert(this._not ^ (this.value.length == 0), message);
      return;
    }
    // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
    assert(this._not ^ (!this.value), message);
  }

  @inline
  public toThrow(message: string = ""): void {
    reportExpectedValue<bool>(false, true, this._not);
    // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
    assert(this._not ^ (!tryCall(this.value)), message);
  }

  @inline
  public toBeGreaterThan(value: T | null, message: string = ""): void {
    if (isReference<T>() && (value == null || this.value == null)) assert(false, message);
    // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
    assert(this._not ^ (this.value > value), message);
  }

  @inline
  public toBeGreaterThanOrEqualTo(value: T | null, message: string = ""): void {
    this.report(value);
    if (isReference<T>() && (value == null || this.value == null)) assert(false, message);
    // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
    assert(this._not ^ (this.value >= value), message);
  }

  @inline
  public toBeLessThan(value: T | null, message: string = ""): void {
    this.report(value);
    if (isReference<T>() && (value == null || this.value == null)) assert(false, message);
    // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
    assert(this._not ^ (this.value < value), message);
  }

  @inline
  public toBeLessThanOrEqualTo(value: T | null, message: string = ""): void {
    this.report(value);
    if (isReference<T>() && (value == null || this.value == null)) assert(false, message);
    // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
    assert(this._not ^ (this.value <= value), message);
  }

  @inline
  public toBeNull(message: string = ""): void {
    this.report(null);
    if (isReference<T>()) {
      // @ts-ignore: bool is a number type that returns 1, and thus `^` compiles properly
      assert(this._not ^ (this.value == null), message);
    }
  }

  @inline
  public report(value: T | null): void {
    if (isReference<T>()) {
      reportExpectedReference(this.value, value, offsetof<T>(), this._not);
    } else {
      reportExpectedValue(this.value, value, this._not);
    }
  }
}

// @ts-ignore: decorators *are* valid here
@global
export function expect<T>(value: T | null): Expectation<T> {
  return new Expectation<T>(value);
}