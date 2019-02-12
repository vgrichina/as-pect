import { TestSuite } from "./TestSuite";
import chalk from "chalk";
import { ASUtil, instantiateBuffer } from "assemblyscript/lib/loader";
const { performance } = require('perf_hooks');

const hex = (value: number) => {
  var result: string = value.toString(16);
  if (result.length === 1) return "0" + result;
  return result;
};

export class TestRunner {
  constructor(buffer: Uint8Array, imports: any) {
    this.wasm = instantiateBuffer(buffer, this.createImports(imports));
  }

  public reason: string = "";
  public suites: TestSuite[] = [];
  public wasm: ASUtil;
  public actual: string = "";
  public expected: string = "";
  public passed: boolean = true;

  createImports(imports: any = {}): any {
    imports.env = {
      abort: this.abort.bind(this),
    };
    imports.__aspect = {
      tryCall: this.tryCall.bind(this),
      reportDescribe: this.reportDescribe.bind(this),
      reportTest: this.reportTest.bind(this),
      reportBeforeEach: this.reportBeforeEach.bind(this),
      reportBeforeAll: this.reportBeforeAll.bind(this),
      reportAfterEach: this.reportAfterEach.bind(this),
      reportAfterAll: this.reportAfterAll.bind(this),
      reportTodo: this.reportTodo.bind(this),
      reportExpectedReference: this.reportExpectedReference.bind(this),
      reportExpectedValue: this.reportExpectedValue.bind(this),
    };
    return imports;
  }
  run() {
    var start = 0;
    var end = 0;
    var failed = 0;
    var success = 0;
    var total = 0;
    var time = 0;

    for (let suite of this.suites) {
      let suiteName = this.wasm.getString(suite.describe);
      console.log("");
      console.log(chalk`Describe {bold ${suiteName}}:`);

      for (const todo of suite.todos) {
        console.log(chalk`  {bgWhite.black [TODO]} ${this.wasm.getString(todo)}`);
      }
      console.log("");

      const beforeAllResult = this.tryCall(suite.beforeAll);

      if (beforeAllResult === 0) {
        console.log(chalk`  {bgBrightRed.black [Failure]} Test suite ${this.wasm.getString(suite.describe)} failed in beforeAll callback.`);
        console.log(chalk`    {bgWhite.black [Reason]} ${this.reason}`);
      }

      for (let i = 0; i < suite.tests.length; i++) {
        start = performance.now();
        let beforeEachResult = this.tryCall(suite.beforeEach);
        if (beforeEachResult === 0) {
          console.log(chalk`  {beRedBright.black [Failure]} Test suite ${this.wasm.getString(suite.describe)} failed in beforeEach callback.`);
          console.log(chalk`    {bgWhite.black [Reason]} ${this.reason}`);
          break;
        }

        let testName = this.wasm.getString(suite.testNames[i]);
        let testResult = this.tryCall(suite.tests[i]);
        total += 1;
        if (testResult === 1) {
          success += 1;
          console.log(chalk`  {bgGreenBright.black [Success]} ✔ ${testName}`);
        } else {
          failed += 1;
          this.passed = false;
          console.log(chalk`  {bgRedBright.black [Failure]} ✖ ${testName}`);
          console.log(chalk`   {bgWhite.black [Reason]} ${this.reason}`);
          console.log(chalk`   {bgWhite.black [Actual]} {red ${this.actual}}`);
          console.log(chalk` {bgWhite.black [Expected]} {greenBright ${this.actual}}`);
          console.log("");
        }

        let afterEachResult = this.tryCall(suite.afterEach);
        if (afterEachResult === 0) {
          console.log(chalk`  {beRedBright.black [Failure]} Test suite ${suiteName} failed in afterEach callback.`);
          console.log(chalk`    {bgWhite.black [Reason]} ${this.reason}`);
          this.passed = false;
          break;
        }
      }

      const afterAllResult = this.tryCall(suite.afterAll);
      if (afterAllResult === 0) {
        console.log(chalk`  {beRedBright.black [Failure]} Test suite ${suiteName} failed in afterAll callback.`);
        console.log(chalk`    {bgWhite.black [Reason]} ${this.reason}`);
        this.passed = false;
      }
      end = performance.now();
      time = Math.round((end - start) * 1000) / 1000;
      console.log("");
      console.log(`Suite     : ${suiteName}`);
      console.log(`Test Suite: ${this.passed ? chalk`✔ {bgGreenBright.black PASS}` : chalk`✖ {bgRedBright.white FAIL}`}`);
      console.log(`Tests     : ${success} passed, ${failed} failed, ${total} total`);
      console.log(`Time      : ${time}ms`);
      console.log("");
    }
    console.log("");
  }
  tryCall(pointer: number): 1 | 0 {
    if (pointer === -1) return 1;

    var func = this.wasm.getFunction(pointer);
    try {
      func();
    } catch (ex){
      return 0;
    }
    return 1;
  }
  reportDescribe(suiteName: number): void {
    var suite = new TestSuite();
    suite.describe = suiteName;
    this.suites.push(suite);
  }
  reportTest(testName: number, callback: number): void {
    var suite = this.suites[this.suites.length - 1];
    suite.tests.push(callback);
    suite.testNames.push(testName);
  }
  reportBeforeEach(cb: number): void {
    var suite = this.suites[this.suites.length - 1];
    suite.beforeEach = cb;
  }
  reportBeforeAll(cb: number): void {
    var suite = this.suites[this.suites.length - 1];
    suite.beforeAll = cb;
  }
  reportAfterEach(cb: number): void {
    var suite = this.suites[this.suites.length - 1];
    suite.afterEach = cb;
  }
  reportAfterAll(cb: number): void {
    var suite = this.suites[this.suites.length - 1];
    suite.afterAll = cb;
  }
  reportExpectedReference(expected: number, actual: number, offset: number, negated: number): void {
    this.expected = (negated === 1 ? "not " : "" ) +
    (expected === 0
      ? "null"
      : Array.from(this.wasm.U8.slice(expected, expected + offset)).map(hex).join(" "));
    this.actual = (actual === 0
      ? "null"
      : Array.from(this.wasm.U8.slice(actual, actual + offset)).map(hex).join(" "));
  }
  reportExpectedValue(expected: number, actual: number, negated: number): void {
    this.expected = (negated ? "not " : "" ) + expected.toString();
    this.actual = actual.toString();
  }
  reportTodo(description: number): void {
    var suite = this.suites[this.suites.length - 1];
    suite.todos.push(description);
  }
  abort(reasonPointer: number, _fileNamePointer: number, _c: number, _d: number): void {
    this.reason = this.wasm.getString(reasonPointer);
  }

}