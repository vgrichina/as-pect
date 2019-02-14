declare module "test/TestResult" {
    export class TestResult {
        /**
         * The actual test's name or description.
         */
        testName: string;
        /**
         * The indicator to see if the test passed.
         */
        pass: boolean;
        /**
         * The time in milliseconds indicating how long the test ran.
         */
        time: number;
        /**
         * The reported actual value description.
         */
        actual: string;
        /**
         * The reported expected value description.
         */
        expected: string;
        /**
         * If the test failed, this is the message describing why the test failed.
         */
        message: string;
    }
}
declare module "test/TestGroup" {
    import { TestResult } from "test/TestResult";
    export class TestGroup {
        /**
         * A pointer that points to the test suite name.
         */
        suiteNamePointer: number;
        /**
         * A pointer that points to the beforeAll callback for this test group.
         */
        beforeAllPointer: number;
        /**
         * A pointer that points to the beforeEach callback for this test group.
         */
        beforeEachPointer: number;
        /**
         * A pointer that points to the afterEach callback for this test group.
         */
        afterEachPointer: number;
        /**
         * A pointer that points to the afterAll callback for this test group.
         */
        afterAllPointer: number;
        /**
         * A pointer[] that points to each test function.
         */
        testFunctionPointers: number[];
        /**
         * A pointer[] that points to all the test names.
         */
        testNamePointers: number[];
        /**
         * A count of how many successful tests ran in this test group.
         */
        successCount: number;
        /**
         * A count of how many failed tests ran in this test group.
         */
        failCount: number;
        /**
         * A count of how many tests ran in this test group. This may be different that the actual test
         * count because the test suite ends if any setup functions throw an error.
         */
        totalCount: number;
        /**
         * A pointer array that points to the todo string references.
         */
        todoPointers: number[];
        /**
         * The name of this test group. (e.g. `describe("test-group-name")`)
         */
        name: string;
        /**
         * A boolean which indicates if the test group passed.
         */
        pass: boolean;
        /**
         * How long the test group ran in milliseconds rounded to the nearest thousanth.
         */
        time: number;
        /**
         * An array of test results.
         */
        results: TestResult[];
        /**
         * A resolved list of todos.
         */
        todos: string[];
        /**
         * The number of todo items.
         */
        todoCount: number;
        /**
         * The reason this test group failed.
         */
        reason: string;
    }
}
declare module "test/TestSuite" {
    import { TestGroup } from "test/TestGroup";
    export class TestSuite {
        /**
         * All the test groups in this test suite.
         */
        testGroups: TestGroup[];
        /**
         * The total number tests run in this test suite.
         */
        totalTests: number;
        /**
         * The total number test successes in this test suite.
         */
        successCount: number;
        /**
         * The total number of test fails in this test suite.
         */
        failCount: number;
        /**
         * The total number to todos left to complete in this test suite.
         */
        todoCount: number;
        /**
         * The test suite filename.
         */
        filename: string;
        /**
         * The total time it took for this test suite to run in milliseconds rounded to the nearest
         * thousandth.
         */
        time: number;
        /**
         * An indicator if the test suite passed.
         */
        pass: boolean;
    }
}
declare module "reporter/Reporter" {
    import { TestGroup } from "test/TestGroup";
    import { TestResult } from "test/TestResult";
    import { TestSuite } from "test/TestSuite";
    export abstract class Reporter {
        /**
         * A function that is called when a test suite starts.
         *
         * @param {TestSuite} suite - The started test suite.
         */
        abstract onStart(suite: TestSuite): void;
        /**
         * A function that is called when a test group starts.
         *
         * @param {TestGroup} group - The started test group.
         */
        abstract onGroupStart(group: TestGroup): void;
        /**
         * A function that is called when a test group ends.
         *
         * @param {TestGroup} group - The ended test group.
         */
        abstract onGroupFinish(group: TestGroup): void;
        /**
         * A function that is called when a test starts.
         *
         * @param {TestGroup} group - The current test group.
         * @param {TestResult} result - The generated test result reference that will be used for the test.
         */
        abstract onTestStart(group: TestGroup, result: TestResult): void;
        /**
         * A function that is called when a test ends.
         *
         * @param {TestGroup} group - The current test group.
         * @param {TestResult} result - The generated test result reference.
         */
        abstract onTestFinish(group: TestGroup, result: TestResult): void;
        /**
         * A function that is called when a test suite ends.
         *
         * @param {TestSuite} suite - The ended test suite.
         */
        abstract onFinish(suite: TestSuite): void;
        /**
         * A function that is called when a test group reports a "todo" item.
         *
         * @param {TestGroup} group - The current test group.
         * @param {string} todo - The todo description.
         */
        abstract onTodo(group: TestGroup, todo: string): void;
    }
}
declare module "reporter/DefaultReporter" {
    import { Reporter } from "reporter/Reporter";
    import { TestGroup } from "test/TestGroup";
    import { TestResult } from "test/TestResult";
    import { TestSuite } from "test/TestSuite";
    export class DefaultReporter extends Reporter {
        onStart(suite: TestSuite): void;
        onGroupStart(group: TestGroup): void;
        onGroupFinish(group: TestGroup): void;
        onTestStart(_group: TestGroup, _test: TestResult): void;
        onTestFinish(_group: TestGroup, test: TestResult): void;
        onFinish(suite: TestSuite): void;
        onTodo(_group: TestGroup, todo: string): void;
    }
}
declare module "test/TestRunner" {
    import { TestSuite } from "test/TestSuite";
    import { ASUtil } from "assemblyscript/lib/loader";
    import { Reporter } from "reporter/Reporter";
    /**
     * The test class that hooks up the web assembly imports, and runs each test group in a file.
     */
    export class TestRunner {
        constructor();
        /**
         * This is the value set by the web assembly module whenever an expectation fails.
         */
        message: string;
        /**
         * This is the currently running TestSuite.
         */
        suite: TestSuite | null;
        /**
         * This is the string that represents the current actual value reported by the module.
         */
        actual: string;
        /**
         * This is the string that represents the current expected value reported by the module.
         */
        expected: string;
        /**
         * This boolean is set to true for every run, and is true if the test suite passed.
         */
        passed: boolean;
        /**
         * This is the web assembly module.
         */
        wasm: ASUtil | null;
        /**
         * This function generates web assembly imports object.
         *
         * @param {any} imports - The web assembly imports to be mixed in.
         */
        createImports(imports?: any): any;
        /**
         * Runs a test suite from a compiled AssemblyScript module buffer.
         *
         * @param {string} filename - The name of the file.
         * @param {Uint8Array} buffer - The buffer containing the AssemblyScript module.
         * @param {any} imports - Custom web assembly imports object.
         * @param {Reporter} reporter - The reporter that reports each test and fail.
         */
        runBuffer(filename: string, buffer: Uint8Array, imports?: any, reporter?: Reporter): void;
        /**
         * Runs a test suite from a fetched reponse object that resolves to an AssemblyScript module.
         *
         * @param {string} filename - The name of the file.
         * @param {Promise<Response>} response - The buffer containing the AssemblyScript module.
         * @param {any} imports - Custom web assembly imports object.
         * @param {Reporter} reporter - The reporter that reports each test and fail.
         */
        runStreaming(filename: string, response: Promise<Response>, imports?: any, reporter?: Reporter): Promise<void>;
        /**
         * This function should be called after the test suite is initialized and the web assembly module
         * has been instantiated.
         *
         * @param {string} filename - The name of the test file.
         * @param {Reporter} reporter - The reporter that reports each test and fail.
         */
        run(filename: string, reporter?: Reporter): void;
        /**
         * This is a web assembly utility function that wraps a function call in a try catch block to
         * report success or failure.
         *
         * @param {number} pointer - The function pointer to call. It must accept no parameters and return
         * void.
         * @returns {1 | 0} - If the callback was run successfully without error, it returns 1, else it
         * returns 0.
         */
        tryCall(pointer: number): 1 | 0;
        /**
         * This web assembly linked function creates a test group. It's called when the test suite calls
         * the describe("test", callback) function from within AssemblyScript. It returns a pointer to the
         * suiteName string.
         *
         * @param {number} suiteNamePointer
         */
        reportDescribe(suiteNamePointer: number): void;
        /**
         * This web assembly linked function creates a test from the callback and the testNamePointer in
         * the current group. It assumes that the group has already been created with the describe
         * function. It is called when `it("description", callback)` or `test("description", callback)`
         * is called.
         *
         * @param {number} testNamePointer - The test's name pointer.
         * @param {number} callback - The test's function.
         */
        reportTest(testNamePointer: number, callback: number): void;
        /**
         * This web assembly linked function sets the group's "beforeEach" callback pointer.
         *
         * @param {number} callbackPointer - The callback that should run before each test.
         */
        reportBeforeEach(callbackPointer: number): void;
        /**
         * This web assembly linked function sets the group's "beforeAll" callback pointer.
         *
         * @param {number} callbackPointer - The callback that should run before each test group.
         */
        reportBeforeAll(callbackPointer: number): void;
        /**
         * This web assembly linked function sets the group's "afterEach" callback pointer.
         *
         * @param {number} callbackPointer - The callback that should run before each test group.
         */
        reportAfterEach(callbackPointer: number): void;
        /**
         * This web assembly linked function sets the group's "afterAll" callback pointer.
         *
         * @param {number} callbackPointer - The callback that should run before each test group.
         */
        reportAfterAll(callbackPointer: number): void;
        /**
         * This function reports a single "todo" item in a test suite.
         *
         * @param {number} todoPointer - The todo description string pointer.
         */
        reportTodo(todoPointer: number): void;
        /**
         * This function reports an actual string value.
         *
         * @param {number} stringPointer - A pointer that points to the actual string.
         */
        reportActualString(stringPointer: number): void;
        /**
         * This function reports an expected string value.
         *
         * @param {number} stringPointer - A pointer that points to the expected string.
         * @param {1 | 0} negated - An indicator if the expectation is negated.
         */
        reportExpectedString(value: number, negated: 1 | 0): void;
        /**
         * This function reports an actual null value.
         */
        reportActualNull(): void;
        /**
         * This function reports an expected null value.
         *
         * @param {1 | 0} negated - An indicator if the expectation is negated.
         */
        reportExpectedNull(negated: 1 | 0): void;
        /**
         * This function reports an actual numeric value.
         *
         * @param {number} value - The value to be expected.
         */
        reportActualValue(value: number): void;
        /**
         * This function reports an expected numeric value.
         *
         * @param {number} value - The value to be expected
         * @param {1 | 0} negated - An indicator if the expectation is negated.
         */
        reportExpectedValue(value: number, negated: 0 | 1): void;
        /**
         * This function reports an actual reference value. It converts the reference to a string of hex
         * characters with a space between each `u8` value.
         *
         * @param {number} referencePointer - The actual reference pointer.
         * @param {number} offset - The size of the reference in bytes.
         */
        reportActualReference(referencePointer: number, offset: number): void;
        /**
         * This function reports an expected reference value. It converts the reference to a string of hex
         * characters with a space between each `u8` value.
         *
         * @param {number} referencePointer - The expected reference pointer.
         * @param {number} offset - The size of the reference in bytes.
         * @param {1 | 0} negated - An indicator if the expectation is negated.
         */
        reportExpectedReference(referencePointer: number, offset: number, negated: 1 | 0): void;
        /**
         * This function reports an expected truthy value.
         *
         * @param {1 | 0} negated - An indicator if the expectation is negated.
         */
        reportExpectedTruthy(negated: 1 | 0): void;
        /**
         * This function reports an expected falsy value.
         *
         * @param {1 | 0} negated - An indicator if the expectation is negated.
         */
        reportExpectedFalsy(negated: 1 | 0): void;
        /**
         * This function is called after each expectation if the expectation passes. This prevents other
         * unreachable() conditions that throw errors to report actual and expected values too.
         */
        clearExpected(): void;
        /**
         * This function overrides the provided AssemblyScript `env.abort()` function to catch abort
         * reasons.
         *
         * @param {number} reasonPointer - This points to the message value that causes the expectation to
         * fail.
         * @param {number} _fileNamePointer - The file name that reported the error. (Ignored)
         * @param {number} _line - The line that reported the error. (Ignored)
         * @param {number} _col - The column that reported the error. (Ignored)
         */
        abort(reasonPointer: number, _fileNamePointer: number, _line: number, _col: number): void;
    }
}
declare module "util/IConfiguration" {
    import { Reporter } from "reporter/Reporter";
    export interface IConfiguration {
        include: string[];
        disclude?: RegExp[];
        imports?: any;
        reporter?: Reporter;
    }
}
declare module "cli" {
    /**
     * This is the cli entry point and expects an array of arguments from the command line.
     *
     * @param {string[]} args - The arguments from the command line
     */
    export function asp(args: string[]): void;
}
declare module "as-pect" {
    export * from "test/TestGroup";
    export * from "test/TestResult";
    export * from "test/TestRunner";
    export * from "test/TestSuite";
    export * from "util/IConfiguration";
    export * from "reporter/DefaultReporter";
    export * from "reporter/Reporter";
    export * from "cli";
}
declare module "test" { }
//# sourceMappingURL=as-pect.amd.d.ts.map