import "allocator/arena";
import { expect, it, describe } from "./index";

class Vec3 {
  x: f64;
  y: f64;
  z: f64;

  constructor(x: f64, y: f64, z: f64) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

describe("ASpect", (): void => {
  it("should create an expectation with a value", (): void => {
    var result = expect<i32>(1);
    assert(result.value == 1, "The expect function does not report values correctly.");
  });

  it("should negate the _not property", (): void => {
    var result = expect<i32>(1).not;
    assert(result._not);
  });

  it("should correctly assert toStrictEqual assertions for value types", (): void => {
    expect<i32>(3).toStrictEqual(3);
  });

  it("should correctly assert toStrictEqual assertions for reftypes", (): void => {
    expect<Vec3>(new Vec3(1, 2, 3)).toStrictEqual(new Vec3(1, 2, 3));
  });

  it("should correctly assert toStrictEqual for reftypes that are null", (): void => {
    expect<Vec3>(null).toStrictEqual(null);
  });

  it("should correctly assert negated toStrictEqual assertions for value types", (): void => {
    expect<i32>(3).not.toStrictEqual(4);
  });

  it("should correctly assert negated toStrictEqual assertions for null comparisons", (): void => {
    expect<Vec3>(null).not.toStrictEqual(new Vec3(1, 2, 3));
  });

  it("should correctly assert negated toStrictEqual assertions for unequal reftypes", (): void => {
    var left = new Vec3(4, 5, 6);
    var right = new Vec3(1, 2, 3);
    expect<Vec3>(left).not.toStrictEqual(right);
  });

  it("should correctly assert truthy values", (): void => {
    expect<i32>(1).toBeTruthy();
    expect<bool>(true).toBeTruthy();
    expect<Vec3>(new Vec3(1, 2, 3)).toBeTruthy();
    expect<string>("Test!").toBeTruthy();
  });

  it("should correctly assert negated truthy values", (): void => {
    expect<i32>(0).not.toBeTruthy();
    expect<bool>(false).not.toBeTruthy();
    expect<Vec3>(null).not.toBeTruthy();
    expect<string>("").not.toBeTruthy();
  });

  it("should correctly assert negated falsy values", (): void => {
    expect<i32>(1).not.toBeFalsy();
    expect<bool>(true).not.toBeFalsy();
    expect<Vec3>(new Vec3(1, 2, 3)).not.toBeFalsy();
    expect<string>("Test!").not.toBeFalsy();
  });

  it("should correctly assert falsy values", (): void => {
    expect<i32>(0).toBeFalsy();
    expect<bool>(false).toBeFalsy();
    expect<Vec3>(null).toBeFalsy();
    expect<string>("").toBeFalsy();
  });

  it("should correctly detect unreachable()", (): void => {
    expect<() => void>((): void => { unreachable(); }).toThrow();
  });

  it("should correctly detect function completion", (): void => {
    expect<() => void>((): void => {}).not.toThrow();
  });

  it("should detect greater than values", (): void => {
    expect<i32>(1).toBeGreaterThan(0);
  });

  it("should detect negated greater than values", (): void => {
    expect<i32>(1).not.toBeGreaterThan(2);
  });

  it("should detect greater than or equal to values", (): void => {
    expect<i32>(1).toBeGreaterThanOrEqualTo(1);
    expect<i32>(1).toBeGreaterThanOrEqualTo(0);
  });

  it("should detect greater than or equal to values", (): void => {
    expect<i32>(1).not.toBeGreaterThanOrEqualTo(2);
  });

  it("should detect less than values", (): void => {
    expect<i32>(0).toBeLessThan(1);
  });

  it("should detect negated less than values", (): void => {
    expect<i32>(2).not.toBeLessThan(1);
  });

  it("should detect less than or equal to values", (): void => {
    expect<i32>(1).toBeLessThanOrEqualTo(1);
    expect<i32>(1).toBeLessThanOrEqualTo(2);
  });

  it("should detect negated less than or equal values", (): void => {
    expect<i32>(1).not.toBeLessThanOrEqualTo(0);
  });

  it("should detect reftype nulls", (): void => {
    expect<Vec3>(null).toBeNull();
  });

  it("should not detect value type nulls", (): void => {
    expect<i32>(0).not.toBeNull();
  });

  it("should expect a reftype not to be null", (): void => {
    expect<Vec3>(new Vec3(1, 2, 3)).not.toBeNull();
  });

  it("should report a failure message (this is expected to fail)", (): void => {
    expect<bool>(false).toBeTruthy("This is an expected error message!");
  });
});
