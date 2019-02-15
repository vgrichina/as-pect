import { TestGroup } from "../test/TestGroup";
import { TestResult } from "../test/TestResult";
import { TestSuite } from "../test/TestSuite";
export declare abstract class Reporter {
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
    /**
     * Whenever a value is logged to the test suite, this function is called after the test has
     * completed for each logged value.
     *
     * @param {TestResult | null} result - The generated test result that is logging the value, or
     * null if the command line interface is logging a string.
     * @param {string} logValue - The string that should be logged.
     */
    abstract onLog(test: TestResult | null, logValue: string): void;
}
//# sourceMappingURL=Reporter.d.ts.map