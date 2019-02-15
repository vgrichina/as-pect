var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define("util/LogValue", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LogValue = /** @class */ (function () {
        function LogValue() {
            this.pointer = 0;
            this.offset = 0;
            this.bytes = [];
            this.message = "";
            this.stack = "";
            this.test = null;
            this.group = null;
        }
        return LogValue;
    }());
    exports.LogValue = LogValue;
});
define("util/ActualValue", ["require", "exports", "util/LogValue"], function (require, exports, LogValue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ActualValue = /** @class */ (function (_super) {
        __extends(ActualValue, _super);
        function ActualValue() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.negated = false;
            return _this;
        }
        return ActualValue;
    }(LogValue_1.LogValue));
    exports.ActualValue = ActualValue;
});
define("test/TestResult", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TestResult = /** @class */ (function () {
        function TestResult() {
            /**
             * The actual test's name or description.
             */
            this.testName = "";
            /**
             * The indicator to see if the test passed.
             */
            this.pass = false;
            /**
             * The time in milliseconds indicating how long the test ran.
             */
            this.time = 0;
            /**
             * The reported actual value description.
             */
            this.actual = null;
            /**
             * The reported expected value description.
             */
            this.expected = null;
            /**
             * If the test failed, this is the message describing why the test failed.
             */
            this.message = "";
            /**
             * A set of strings logged by the test itself.
             */
            this.log = [];
            /**
             * The generated stack trace if the test errored.
             */
            this.stack = null;
        }
        return TestResult;
    }());
    exports.TestResult = TestResult;
});
define("test/TestGroup", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TestGroup = /** @class */ (function () {
        function TestGroup() {
            /**
             * A pointer that points to the test suite name.
             */
            this.suiteNamePointer = -1;
            /**
             * A pointer that points to the beforeAll callback for this test group.
             */
            this.beforeAllPointer = -1;
            /**
             * A pointer that points to the beforeEach callback for this test group.
             */
            this.beforeEachPointer = -1;
            /**
             * A pointer that points to the afterEach callback for this test group.
             */
            this.afterEachPointer = -1;
            /**
             * A pointer that points to the afterAll callback for this test group.
             */
            this.afterAllPointer = -1;
            /**
             * A pointer[] that points to each test function.
             */
            this.testFunctionPointers = [];
            /**
             * A pointer[] that points to all the test names.
             */
            this.testNamePointers = [];
            /**
             * A count of how many successful tests ran in this test group.
             */
            this.successCount = 0;
            /**
             * A count of how many failed tests ran in this test group.
             */
            this.failCount = 0;
            /**
             * A count of how many tests ran in this test group. This may be different that the actual test
             * count because the test suite ends if any setup functions throw an error.
             */
            this.totalCount = 0;
            /**
             * A pointer array that points to the todo string references.
             */
            this.todoPointers = [];
            /**
             * The name of this test group. (e.g. `describe("test-group-name")`)
             */
            this.name = "";
            /**
             * A boolean which indicates if the test group passed.
             */
            this.pass = false;
            /**
             * How long the test group ran in milliseconds rounded to the nearest thousanth.
             */
            this.time = 0;
            /**
             * An array of test results.
             */
            this.results = [];
            /**
             * A resolved list of todos.
             */
            this.todos = [];
            /**
             * The number of todo items.
             */
            this.todoCount = 0;
            /**
             * The reason this test group failed.
             */
            this.reason = "";
            /**
             * The logged items in the current testGroup.
             */
            this.log = [];
        }
        return TestGroup;
    }());
    exports.TestGroup = TestGroup;
});
define("test/TestSuite", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TestSuite = /** @class */ (function () {
        function TestSuite() {
            /**
             * All the test groups in this test suite.
             */
            this.testGroups = [];
            /**
             * The total number tests run in this test suite.
             */
            this.totalTests = 0;
            /**
             * The total number test successes in this test suite.
             */
            this.successCount = 0;
            /**
             * The total number of test fails in this test suite.
             */
            this.failCount = 0;
            /**
             * The total number to todos left to complete in this test suite.
             */
            this.todoCount = 0;
            /**
             * The test suite filename.
             */
            this.filename = "";
            /**
             * The total time it took for this test suite to run in milliseconds rounded to the nearest
             * thousandth.
             */
            this.time = 0;
            /**
             * An indicator if the test suite passed.
             */
            this.pass = false;
        }
        return TestSuite;
    }());
    exports.TestSuite = TestSuite;
});
define("reporter/Reporter", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Reporter = /** @class */ (function () {
        function Reporter() {
        }
        return Reporter;
    }());
    exports.Reporter = Reporter;
});
define("reporter/DefaultReporter", ["require", "exports", "reporter/Reporter", "chalk"], function (require, exports, Reporter_1, chalk_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chalk_1 = __importDefault(chalk_1);
    function stringifyActualValue(type, value) {
        if (!value)
            return "";
        var byteString = "";
        if (value.bytes.length > 0) {
            byteString = "\n               " + createReferenceString(value.bytes, value.pointer, value.offset)
                .split("\n")
                .join("\n               ");
        }
        var stackString = "\n           " + value.stack
            .split("\n")
            .join("\n           ");
        return type === 1 /* Expected */
            ? chalk_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["{green ", "}{blue ", "}{yellow ", "}\n"], ["{green ", "}{blue ", "}{yellow ", "}\\n"])), value.message, byteString, stackString) : chalk_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["{red ", "}{blue ", "}{yellow ", "}\n"], ["{red ", "}{blue ", "}{yellow ", "}\\n"])), value.message, byteString, stackString);
    }
    /**
     * This function generates a 2 digit hexadecimal string from the given number.
     *
     * @param {number} value - A number from [0-255].
     * @returns {string} - The hexadecimal string representing the byte
     */
    function hex(value) {
        var result = value.toString(16);
        if (result.length === 1)
            return "0" + result;
        return result;
    }
    /**
     * This function returns a string that formats the bytes into rows of 8 bytes with a space between
     * byte 4 and 5 on each row.
     *
     * @param {number[]} bytes - The byte array
     * @param {number} pointer - The pointer of the reference.
     * @param {number} offset - The offset of the reference.
     */
    function createReferenceString(bytes, pointer, offset) {
        var referenceEnd = pointer + offset;
        // start with a tabbed out string
        var result = "Range: [dec: " + pointer.toString() + "~" + referenceEnd.toString() + "] [hex: 0x" + pointer.toString(16) + "~0x" + referenceEnd.toString(16) + "]";
        result += "\n07 06 05 04   03 02 01 00";
        result += "\n~~~~~~~~~~~~~~~~~~~~~~~~~";
        result += "\n";
        // for each byte
        for (var i = 0; i < offset; i++) {
            // append a byte and an empty space
            result += hex(bytes[i]) + " ";
            if (i % 8 === 7) {
                // every 8 characters add a newline
                result += "\n";
            }
            else if (i % 4 === 3) {
                // every 4 characters add an extra two spaces
                result += "  ";
            }
        }
        // remove leading space
        return result.trimRight();
    }
    var DefaultReporter = /** @class */ (function (_super) {
        __extends(DefaultReporter, _super);
        function DefaultReporter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DefaultReporter.prototype.onStart = function (suite) {
            console.log(chalk_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["     {yellow [Log]:} ", ""], ["     {yellow [Log]:} ", ""])), suite.filename));
            console.log("");
        };
        DefaultReporter.prototype.onGroupStart = function (group) {
            console.log(chalk_1.default(templateObject_4 || (templateObject_4 = __makeTemplateObject(["[Describe]: ", ""], ["[Describe]: ", ""])), group.name));
            console.log("");
        };
        DefaultReporter.prototype.onGroupFinish = function (group) {
            var result = group.pass
                ? chalk_1.default(templateObject_5 || (templateObject_5 = __makeTemplateObject(["{green \u2714 PASS}"], ["{green \u2714 PASS}"]))) : chalk_1.default(templateObject_6 || (templateObject_6 = __makeTemplateObject(["{red \u2716 FAIL}"], ["{red \u2716 FAIL}"])));
            console.log("");
            console.log(chalk_1.default(templateObject_7 || (templateObject_7 = __makeTemplateObject(["  [Result]: ", ""], ["  [Result]: ", ""])), result));
            console.log(chalk_1.default(templateObject_8 || (templateObject_8 = __makeTemplateObject(["   [Tests]: ", " pass, ", " fail, ", " total"], ["   [Tests]: ", " pass, ", " fail, ", " total"])), group.successCount.toString(), group.failCount.toString(), group.totalCount.toString()));
            console.log(chalk_1.default(templateObject_9 || (templateObject_9 = __makeTemplateObject(["    [Todo]: ", " tests"], ["    [Todo]: ", " tests"])), group.todoCount.toString()));
            console.log(chalk_1.default(templateObject_10 || (templateObject_10 = __makeTemplateObject(["    [Time]: ", "ms"], ["    [Time]: ", "ms"])), group.time.toString()));
        };
        DefaultReporter.prototype.onTestStart = function (_group, _test) { };
        DefaultReporter.prototype.onTestFinish = function (_group, test) {
            if (test.pass) {
                console.log(chalk_1.default(templateObject_11 || (templateObject_11 = __makeTemplateObject([" {green [Success]: \u2714} ", ""], [" {green [Success]: \u2714} ", ""])), test.testName));
            }
            else {
                console.log(chalk_1.default(templateObject_12 || (templateObject_12 = __makeTemplateObject(["    {red [Fail]: \u2716} ", ""], ["    {red [Fail]: \u2716} ", ""])), test.testName));
                console.log("");
                console.log("   [Actual]: " + stringifyActualValue(0 /* Actual */, test.actual));
                console.log(" [Expected]: " + stringifyActualValue(1 /* Expected */, test.expected));
                if (test.message) {
                    console.log("  [Message]: {yellow " + test.message + "}");
                }
                console.log("    [Stack]: " + test.stack.split("\n").join("\n           "));
            }
        };
        DefaultReporter.prototype.onFinish = function (suite) {
            var result = suite.pass
                ? chalk_1.default(templateObject_13 || (templateObject_13 = __makeTemplateObject(["{green \u2714 Pass} "], ["{green \u2714 Pass} "]))) : chalk_1.default(templateObject_14 || (templateObject_14 = __makeTemplateObject(["{red \u2716 Fail}"], ["{red \u2716 Fail}"])));
            console.log("");
            console.log("~".repeat(process.stdout.columns - 10));
            console.log(chalk_1.default(templateObject_15 || (templateObject_15 = __makeTemplateObject(["    [File]: ", ""], ["    [File]: ", ""])), suite.filename));
            console.log(chalk_1.default(templateObject_16 || (templateObject_16 = __makeTemplateObject(["  [Result]: ", ""], ["  [Result]: ", ""])), result));
            console.log(chalk_1.default(templateObject_17 || (templateObject_17 = __makeTemplateObject([" [Summary]: ", " pass, ", " fail, ", " total"], [" [Summary]: ", " pass, ", " fail, ", " total"])), suite.successCount.toString(), suite.failCount.toString(), suite.totalTests.toString()));
            console.log(chalk_1.default(templateObject_18 || (templateObject_18 = __makeTemplateObject(["    [Todo]: ", " test"], ["    [Todo]: ", " test"])), suite.todoCount.toString()) + (suite.todoCount === 1 ? "s" : ""));
            console.log(chalk_1.default(templateObject_19 || (templateObject_19 = __makeTemplateObject(["    [Time]: ", "ms"], ["    [Time]: ", "ms"])), suite.time.toString()));
            console.log("");
        };
        DefaultReporter.prototype.onTodo = function (_group, todo) {
            console.log(chalk_1.default(templateObject_20 || (templateObject_20 = __makeTemplateObject(["    {yellow [Todo]:} ", ""], ["    {yellow [Todo]:} ", ""])), todo));
        };
        DefaultReporter.prototype.onLog = function (logValue) {
            // create string representations of the pointer
            var pointer = logValue.pointer.toString();
            var hexPointer = logValue.pointer.toString(16);
            // log the log message
            if (logValue.pointer > 0) {
                console.log(chalk_1.default(templateObject_21 || (templateObject_21 = __makeTemplateObject(["     {yellow [Log]:} at address [", "] [hex: 0x", "] ", ""], ["     {yellow [Log]:} at address [", "] [hex: 0x", "] ", ""])), pointer, hexPointer, logValue.message));
                console.log("");
            }
            else {
                console.log(chalk_1.default(templateObject_22 || (templateObject_22 = __makeTemplateObject(["     {yellow [Log]:} ", ""], ["     {yellow [Log]:} ", ""])), logValue.message));
            }
            // if there are bytes to show, create a logging representation of the bytes
            if (logValue.bytes.length > 0) {
                var value = createReferenceString(logValue.bytes, logValue.pointer, logValue.offset);
                console.log(chalk_1.default(templateObject_23 || (templateObject_23 = __makeTemplateObject(["           {blueBright ", "}"], ["           {blueBright ", "}"])), value.split("\n").join("\n           ")));
            }
            console.log(chalk_1.default(templateObject_24 || (templateObject_24 = __makeTemplateObject(["       {yellow ", "}\n"], ["       {yellow ", "}\\n"])), logValue.stack.split("\n").join("\n       ")));
        };
        return DefaultReporter;
    }(Reporter_1.Reporter));
    exports.DefaultReporter = DefaultReporter;
    var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24;
});
define("test/TestRunner", ["require", "exports", "test/TestSuite", "test/TestGroup", "assemblyscript/lib/loader", "test/TestResult", "reporter/DefaultReporter", "util/LogValue", "util/ActualValue"], function (require, exports, TestSuite_1, TestGroup_1, loader_1, TestResult_1, DefaultReporter_1, LogValue_2, ActualValue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var performance = require('perf_hooks').performance;
    var wasmFilter = function (input) { return /wasm/i.test(input); };
    /**
     * The test class that hooks up the web assembly imports, and runs each test group in a file.
     */
    var TestRunner = /** @class */ (function () {
        function TestRunner() {
            /**
             * This is the value set by the web assembly module whenever an expectation fails.
             */
            this.message = "";
            /**
             * This is the currently running TestSuite.
             */
            this.suite = null;
            /**
             * This is the ActualValue that represents the current actual value reported by an expectation.
             */
            this.actual = null;
            /**
             * This is the ActualValue that represents the current expected value reported by an expectation.
             */
            this.expected = null;
            /**
             * This boolean is set to true for every run, and is true if the test suite passed.
             */
            this.passed = true;
            /**
             * This is the web assembly module.
             */
            this.wasm = null;
            /**
             * The currently running test.
             */
            this.currentTest = null;
            /**
             * The currently running test group.
             */
            this.currentGroup = null;
            /**
             * The index of the next group log to be logged to the reporter.
             */
            this.groupLogIndex = 0;
            /**
             * The current reporter.
             */
            this.reporter = null;
            /**
             * The stack trace generated when the currently running test threw.
             */
            this.stack = "";
        }
        /**
         * This function generates web assembly imports object.
         *
         * @param {any} imports - The web assembly imports to be mixed in.
         */
        TestRunner.prototype.createImports = function (imports) {
            if (imports === void 0) { imports = {}; }
            imports.env = {
                abort: this.abort.bind(this),
            };
            imports.__aspect = {
                clearExpected: this.clearExpected.bind(this),
                tryCall: this.tryCall.bind(this),
                logNull: this.logNull.bind(this),
                logReference: this.logReference.bind(this),
                logString: this.logString.bind(this),
                logValue: this.logValue.bind(this),
                reportDescribe: this.reportDescribe.bind(this),
                reportTest: this.reportTest.bind(this),
                reportBeforeEach: this.reportBeforeEach.bind(this),
                reportBeforeAll: this.reportBeforeAll.bind(this),
                reportAfterEach: this.reportAfterEach.bind(this),
                reportAfterAll: this.reportAfterAll.bind(this),
                reportTodo: this.reportTodo.bind(this),
                reportActualNull: this.reportActualNull.bind(this),
                reportExpectedNull: this.reportExpectedNull.bind(this),
                reportActualValue: this.reportActualValue.bind(this),
                reportExpectedValue: this.reportExpectedValue.bind(this),
                reportActualReference: this.reportActualReference.bind(this),
                reportExpectedReference: this.reportExpectedReference.bind(this),
                reportActualString: this.reportActualString.bind(this),
                reportExpectedString: this.reportExpectedString.bind(this),
                reportExpectedTruthy: this.reportExpectedTruthy.bind(this),
                reportExpectedFalsy: this.reportExpectedFalsy.bind(this),
            };
            return imports;
        };
        /**
         * Runs a test suite from a compiled AssemblyScript module buffer.
         *
         * @param {string} filename - The name of the file.
         * @param {Uint8Array} buffer - The buffer containing the AssemblyScript module.
         * @param {any} imports - Custom web assembly imports object.
         * @param {Reporter} reporter - The reporter that reports each test and fail.
         */
        TestRunner.prototype.runBuffer = function (filename, buffer, imports, reporter) {
            if (imports === void 0) { imports = {}; }
            if (reporter === void 0) { reporter = new DefaultReporter_1.DefaultReporter(); }
            this.suite = new TestSuite_1.TestSuite();
            this.wasm = loader_1.instantiateBuffer(buffer, this.createImports(imports));
            this.reporter = reporter;
            this.run(filename);
        };
        /**
         * Runs a test suite from a fetched reponse object that resolves to an AssemblyScript module.
         *
         * @param {string} filename - The name of the file.
         * @param {Promise<Response>} response - The buffer containing the AssemblyScript module.
         * @param {any} imports - Custom web assembly imports object.
         * @param {Reporter} reporter - The reporter that reports each test and fail.
         */
        TestRunner.prototype.runStreaming = function (filename, response, imports, reporter) {
            if (imports === void 0) { imports = {}; }
            if (reporter === void 0) { reporter = new DefaultReporter_1.DefaultReporter(); }
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.suite = new TestSuite_1.TestSuite();
                            _a = this;
                            return [4 /*yield*/, loader_1.instantiateStreaming(response, this.createImports(imports))];
                        case 1:
                            _a.wasm = _b.sent();
                            this.reporter = reporter;
                            this.run(filename);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * This function should be called after the test suite is initialized and the web assembly module
         * has been instantiated.
         *
         * @param {string} filename - The name of the test file.
         * @param {Reporter} reporter - The reporter that reports each test and fail.
         */
        TestRunner.prototype.run = function (filename) {
            if (!this.reporter) {
                throw new Error("Reporter is null, did you forget to set the reporter?");
            }
            var reporter = this.reporter;
            var start = 0;
            var end = 0;
            var groupstart = 0;
            var groupend = 0;
            var teststart = 0;
            var testend = 0;
            var suite = this.suite;
            var wasm = this.wasm;
            var passed = true;
            // set the filename
            suite.filename = filename;
            // report onStart
            reporter.onStart(suite);
            start = performance.now();
            // for each test group generated by the module
            groupLoop: for (var _i = 0, _a = suite.testGroups; _i < _a.length; _i++) {
                var group = _a[_i];
                this.groupLogIndex = 0;
                // set the group name
                var groupName = wasm.getString(group.suiteNamePointer);
                group.name = groupName;
                group.pass = true;
                this.currentGroup = group;
                // list each todo
                for (var _b = 0, _c = group.todoPointers; _b < _c.length; _b++) {
                    var todoPointer = _c[_b];
                    // dereference the todoPointer
                    var todo = wasm.getString(todoPointer);
                    // add it to the list, but don't report it yet.
                    group.todos.push(todo);
                }
                // update group and suite metadata
                group.todoCount = group.todoPointers.length;
                suite.todoCount += group.todoCount;
                // start reporting the group
                reporter.onGroupStart(group);
                for (var _d = 0, _e = group.todos; _d < _e.length; _d++) {
                    var todo = _e[_d];
                    // report each todo first before starting the timer
                    reporter.onTodo(group, todo);
                }
                // start the timer
                groupstart = performance.now();
                // run beforeAll
                var beforeAllResult = this.tryCall(group.beforeAllPointer);
                // if the callback throws an error
                if (beforeAllResult === 0) {
                    groupend = performance.now();
                    group.pass = false;
                    group.reason = "Test suite " + groupName + " failed in beforeAll callback.";
                    passed = false;
                    continue;
                }
                // logged values can happen in the beforeAll callback
                this.flushGroupLogs();
                // for each test function
                for (var i = 0; i < group.testFunctionPointers.length; i++) {
                    // create a new test result
                    var result = new TestResult_1.TestResult();
                    this.currentTest = result;
                    var testname = wasm.getString(group.testNamePointers[i]);
                    result.testName = testname;
                    // run beforeEach
                    var beforeEachResult = this.tryCall(group.beforeEachPointer);
                    if (beforeEachResult === 0) {
                        groupend = performance.now();
                        group.pass = false;
                        group.reason = "Test suite " + groupName + " failed in beforeEach callback.";
                        passed = false;
                        continue groupLoop;
                    }
                    // logs can happen before each test
                    this.flushGroupLogs();
                    // report test start
                    reporter.onTestStart(group, result);
                    // start the test
                    teststart = performance.now();
                    // run the test
                    var testCallResult = this.tryCall(group.testFunctionPointers[i]);
                    // the test is ended
                    testend = performance.now();
                    group.totalCount++;
                    suite.totalTests++;
                    // calculate test time
                    var testtime = Math.round((testend - teststart) * 1000) / 1000;
                    // the test passed!
                    if (testCallResult === 1) {
                        // pass the test
                        result.pass = true;
                        result.time = testtime;
                        // increase group success count
                        group.successCount++;
                        // increase test suite success count
                        suite.successCount++;
                    }
                    else { // the test failed
                        // collect the metadata
                        result.pass = false;
                        result.message = this.message;
                        result.actual = this.actual;
                        result.expected = this.expected;
                        result.stack = this.stack;
                        // fail the group
                        group.failCount++;
                        group.pass = false;
                        // fail the suite
                        suite.failCount++;
                        passed = false;
                    }
                    // run afterEach
                    var afterEachResult = this.tryCall(group.afterEachPointer);
                    if (afterEachResult === 0) {
                        groupend = performance.now();
                        group.pass = false;
                        group.reason = "Test suite " + groupName + " failed in afterEach callback.";
                        passed = false;
                        continue groupLoop;
                    }
                    // report test finish
                    reporter.onTestFinish(group, result);
                    // logs can happen after each test
                    this.flushGroupLogs();
                    this.currentTest = null;
                }
                // run afterAll
                var afterAllResult = this.tryCall(group.afterAllPointer);
                if (afterAllResult === 0) {
                    groupend = performance.now();
                    group.pass = false;
                    group.reason = "Test suite " + groupName + " failed in afterAll callback.";
                    passed = false;
                    continue groupLoop;
                }
                // logs can happen in afterAll callback
                this.flushGroupLogs();
                // end group timing
                groupend = performance.now();
                this.currentGroup = null;
                // calculate the group time
                var grouptime = Math.round((groupend - groupstart) * 1000) / 1000;
                group.reason = "Test suite " + groupName + " passed successfully.";
                group.time = grouptime;
                reporter.onGroupFinish(group);
            }
            // end the test suite timing
            end = performance.now();
            suite.time = Math.round((end - start) * 1000) / 1000;
            suite.pass = passed;
            this.passed = passed;
            // report finished
            reporter.onFinish(suite);
        };
        /**
         * Flush all the collected log values to the logger.
         */
        TestRunner.prototype.flushGroupLogs = function () {
            for (; this.groupLogIndex < this.currentGroup.log.length; this.groupLogIndex++) {
                this.reporter.onLog(this.currentGroup.log[this.groupLogIndex]);
            }
        };
        /**
         * This is a web assembly utility function that wraps a function call in a try catch block to
         * report success or failure.
         *
         * @param {number} pointer - The function pointer to call. It must accept no parameters and return
         * void.
         * @returns {1 | 0} - If the callback was run successfully without error, it returns 1, else it
         * returns 0.
         */
        TestRunner.prototype.tryCall = function (pointer) {
            if (pointer === -1)
                return 1;
            var func = this.wasm.getFunction(pointer);
            try {
                func();
            }
            catch (ex) {
                this.stack = this.getErrorStackTrace(ex);
                return 0;
            }
            return 1;
        };
        /**
         * This web assembly linked function creates a test group. It's called when the test suite calls
         * the describe("test", callback) function from within AssemblyScript. It returns a pointer to the
         * suiteName string.
         *
         * @param {number} suiteNamePointer
         */
        TestRunner.prototype.reportDescribe = function (suiteNamePointer) {
            var group = new TestGroup_1.TestGroup();
            group.suiteNamePointer = suiteNamePointer;
            this.suite.testGroups.push(group);
        };
        /**
         * This web assembly linked function creates a test from the callback and the testNamePointer in
         * the current group. It assumes that the group has already been created with the describe
         * function. It is called when `it("description", callback)` or `test("description", callback)`
         * is called.
         *
         * @param {number} testNamePointer - The test's name pointer.
         * @param {number} callback - The test's function.
         */
        TestRunner.prototype.reportTest = function (testNamePointer, callback) {
            var group = this.suite.testGroups[this.suite.testGroups.length - 1];
            group.testFunctionPointers.push(callback);
            group.testNamePointers.push(testNamePointer);
        };
        /**
         * This web assembly linked function sets the group's "beforeEach" callback pointer.
         *
         * @param {number} callbackPointer - The callback that should run before each test.
         */
        TestRunner.prototype.reportBeforeEach = function (callbackPointer) {
            var group = this.suite.testGroups[this.suite.testGroups.length - 1];
            group.beforeEachPointer = callbackPointer;
        };
        /**
         * This web assembly linked function sets the group's "beforeAll" callback pointer.
         *
         * @param {number} callbackPointer - The callback that should run before each test group.
         */
        TestRunner.prototype.reportBeforeAll = function (callbackPointer) {
            var group = this.suite.testGroups[this.suite.testGroups.length - 1];
            group.beforeAllPointer = callbackPointer;
        };
        /**
         * This web assembly linked function sets the group's "afterEach" callback pointer.
         *
         * @param {number} callbackPointer - The callback that should run before each test group.
         */
        TestRunner.prototype.reportAfterEach = function (callbackPointer) {
            var group = this.suite.testGroups[this.suite.testGroups.length - 1];
            group.afterEachPointer = callbackPointer;
        };
        /**
         * This web assembly linked function sets the group's "afterAll" callback pointer.
         *
         * @param {number} callbackPointer - The callback that should run before each test group.
         */
        TestRunner.prototype.reportAfterAll = function (callbackPointer) {
            var testGroup = this.suite.testGroups[this.suite.testGroups.length - 1];
            testGroup.afterAllPointer = callbackPointer;
        };
        /**
         * This function reports a single "todo" item in a test suite.
         *
         * @param {number} todoPointer - The todo description string pointer.
         */
        TestRunner.prototype.reportTodo = function (todoPointer) {
            var testGroup = this.suite.testGroups[this.suite.testGroups.length - 1];
            testGroup.todoPointers.push(todoPointer);
        };
        /**
         * This function reports an actual string value.
         *
         * @param {number} stringPointer - A pointer that points to the actual string.
         */
        TestRunner.prototype.reportActualString = function (stringPointer) {
            var value = new ActualValue_1.ActualValue();
            value.group = this.currentGroup;
            value.message = "\"" + this.wasm.getString(stringPointer).replace("\"", "\\\"") + "\"";
            value.pointer = stringPointer;
            value.stack = this.getLogStackTrace();
            value.test = this.currentTest;
            this.actual = value;
        };
        /**
         * This function reports an expected string value.
         *
         * @param {number} stringPointer - A pointer that points to the expected string.
         * @param {1 | 0} negated - An indicator if the expectation is negated.
         */
        TestRunner.prototype.reportExpectedString = function (stringPointer, negated) {
            var value = new ActualValue_1.ActualValue();
            value.group = this.currentGroup;
            value.message = "\"" + this.wasm.getString(stringPointer).replace("\"", "\\\"") + "\"";
            value.pointer = stringPointer;
            value.stack = this.getLogStackTrace();
            value.test = this.currentTest;
            value.negated = negated === 1;
            this.expected = value;
        };
        /**
         * This function reports an actual null value.
         */
        TestRunner.prototype.reportActualNull = function () {
            var value = new ActualValue_1.ActualValue();
            value.group = this.currentGroup;
            value.message = "null";
            value.stack = this.getLogStackTrace();
            value.test = this.currentTest;
            this.actual = value;
        };
        /**
         * This function reports an expected null value.
         *
         * @param {1 | 0} negated - An indicator if the expectation is negated.
         */
        TestRunner.prototype.reportExpectedNull = function (negated) {
            var value = new ActualValue_1.ActualValue();
            value.group = this.currentGroup;
            value.message = "null";
            value.stack = this.getLogStackTrace();
            value.test = this.currentTest;
            value.negated = negated === 1;
            this.expected = value;
        };
        /**
         * This function reports an actual numeric value.
         *
         * @param {number} numericValue - The value to be expected.
         */
        TestRunner.prototype.reportActualValue = function (numericValue) {
            var value = new ActualValue_1.ActualValue();
            value.group = this.currentGroup;
            value.message = numericValue.toString();
            value.stack = this.getLogStackTrace();
            value.test = this.currentTest;
            this.actual = value;
        };
        /**
         * This function reports an expected numeric value.
         *
         * @param {number} numericValue - The value to be expected
         * @param {1 | 0} negated - An indicator if the expectation is negated.
         */
        TestRunner.prototype.reportExpectedValue = function (numericValue, negated) {
            var value = new ActualValue_1.ActualValue();
            value.group = this.currentGroup;
            value.message = numericValue.toString();
            value.stack = this.getLogStackTrace();
            value.test = this.currentTest;
            value.negated = negated === 1;
            this.expected = value;
        };
        /**
         * This function reports an actual reference value.
         *
         * @param {number} referencePointer - The actual reference pointer.
         * @param {number} offset - The size of the reference in bytes.
         */
        TestRunner.prototype.reportActualReference = function (referencePointer, offset) {
            var value = new ActualValue_1.ActualValue();
            value.group = this.currentGroup;
            value.message = "Reference Type";
            value.stack = this.getLogStackTrace();
            value.test = this.currentTest;
            value.pointer = referencePointer;
            value.offset = offset;
            value.bytes = Array.from(this.wasm.U8.slice(referencePointer, referencePointer + offset));
            this.actual = value;
        };
        /**
         * This function reports an expected reference value.
         *
         * @param {number} referencePointer - The expected reference pointer.
         * @param {number} offset - The size of the reference in bytes.
         * @param {1 | 0} negated - An indicator if the expectation is negated.
         */
        TestRunner.prototype.reportExpectedReference = function (referencePointer, offset, negated) {
            var value = new ActualValue_1.ActualValue();
            value.group = this.currentGroup;
            value.message = "Reference Type";
            value.stack = this.getLogStackTrace();
            value.test = this.currentTest;
            value.pointer = referencePointer;
            value.offset = offset;
            value.bytes = Array.from(this.wasm.U8.slice(referencePointer, referencePointer + offset));
            value.negated = negated === 1;
            this.expected = value;
        };
        /**
         * This function reports an expected truthy value.
         *
         * @param {1 | 0} negated - An indicator if the expectation is negated.
         */
        TestRunner.prototype.reportExpectedTruthy = function (negated) {
            var value = new ActualValue_1.ActualValue();
            value.group = this.currentGroup;
            value.message = "truthy";
            value.stack = this.getLogStackTrace();
            value.test = this.currentTest;
            value.negated = negated === 1;
            this.expected = value;
        };
        /**
         * This function reports an expected falsy value.
         *
         * @param {1 | 0} negated - An indicator if the expectation is negated.
         */
        TestRunner.prototype.reportExpectedFalsy = function (negated) {
            var value = new ActualValue_1.ActualValue();
            value.group = this.currentGroup;
            value.message = "falsy";
            value.stack = this.getLogStackTrace();
            value.test = this.currentTest;
            value.negated = negated === 1;
            this.expected = value;
        };
        /**
         * This function is called after each expectation if the expectation passes. This prevents other
         * unreachable() conditions that throw errors to report actual and expected values too.
         */
        TestRunner.prototype.clearExpected = function () {
            this.expected = null;
            this.actual = null;
            this.stack = "";
        };
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
        TestRunner.prototype.abort = function (reasonPointer, _fileNamePointer, _line, _col) {
            this.message = this.wasm.getString(reasonPointer);
        };
        /**
         * This adds a logged string to the current test.
         *
         * @param {number} pointer - The pointer to the logged string reference.
         */
        TestRunner.prototype.logString = function (pointer) {
            var value = new LogValue_2.LogValue();
            value.group = this.currentGroup || null;
            value.message = "\"" + this.wasm.getString(pointer).replace("\"", "\\\"") + "\"";
            value.offset = 0;
            value.pointer = pointer;
            value.stack = this.getLogStackTrace();
            value.test = this.currentTest || null;
            // add the log value to the current test
            if (this.currentTest) {
                this.currentTest.log.push(value);
            }
            // add the log value to the current group
            if (this.currentGroup) {
                this.currentGroup.log.push(value);
            }
        };
        /**
         * Log a reference to the reporter.
         *
         * @param {number} referencePointer - The pointer to the reference.
         * @param {number} offset - The offset of the reference.
         */
        TestRunner.prototype.logReference = function (referencePointer, offset) {
            var value = new LogValue_2.LogValue();
            value.bytes = Array.from(this.wasm.U8.slice(referencePointer, referencePointer + offset));
            value.group = this.currentGroup || null;
            value.message = "Reference Type";
            value.offset = offset;
            value.pointer = referencePointer;
            value.stack = this.getLogStackTrace();
            value.test = this.currentTest || null;
            // add the log value to the current test
            if (this.currentTest) {
                this.currentTest.log.push(value);
            }
            // add the log value to the current group
            if (this.currentGroup) {
                this.currentGroup.log.push(value);
            }
        };
        /**
         * Log a numevalueric value to the reporter.
         *
         * @param {number} value - The value to be logged.
         */
        TestRunner.prototype.logValue = function (numericValue) {
            var value = new LogValue_2.LogValue();
            value.group = this.currentGroup || null;
            value.test = this.currentTest || null;
            value.stack = this.getLogStackTrace();
            value.message = "Value " + numericValue.toString();
            // add the log value to the current test
            if (this.currentTest) {
                this.currentTest.log.push(value);
            }
            // add the log value to the current group
            if (this.currentGroup) {
                this.currentGroup.log.push(value);
            }
        };
        /**
         * Log a null value to the reporter.
         */
        TestRunner.prototype.logNull = function () {
            // create a new log value
            var value = new LogValue_2.LogValue();
            // collect log metadata
            value.group = this.currentGroup || null;
            value.test = this.currentTest || null;
            value.stack = this.getLogStackTrace();
            value.message = "null";
            // add the log value to the current test
            if (this.currentTest) {
                this.currentTest.log.push(value);
            }
            // add the log value to the current group
            if (this.currentGroup) {
                this.currentGroup.log.push(value);
            }
        };
        /**
         * Gets a log stack trace.
         */
        TestRunner.prototype.getLogStackTrace = function () {
            try {
                throw new Error("Get stack trace.");
            }
            catch (ex) {
                return ex.stack.toString()
                    .split("\n")
                    .slice(1)
                    .filter(wasmFilter)
                    .join("\n");
            }
        };
        /**
         * Gets an error stack trace.
         */
        TestRunner.prototype.getErrorStackTrace = function (ex) {
            var stackItems = ex.stack.toString().split("\n");
            return [stackItems[0]].concat(stackItems.slice(1).filter(wasmFilter)).join("\n");
        };
        return TestRunner;
    }());
    exports.TestRunner = TestRunner;
});
define("util/IConfiguration", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("cli", ["require", "exports", "chalk", "path", "glob", "yargs-parser", "lodash.uniq", "assemblyscript/cli/asc", "test/TestRunner", "fs", "reporter/DefaultReporter"], function (require, exports, chalk_2, path_1, glob_1, yargs_parser_1, lodash_uniq_1, asc_1, TestRunner_1, fs_1, DefaultReporter_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    chalk_2 = __importDefault(chalk_2);
    path_1 = __importDefault(path_1);
    glob_1 = __importDefault(glob_1);
    yargs_parser_1 = __importDefault(yargs_parser_1);
    lodash_uniq_1 = __importDefault(lodash_uniq_1);
    asc_1 = __importDefault(asc_1);
    fs_1 = __importDefault(fs_1);
    var pkg = require("../package.json");
    /**
     * This is the cli entry point and expects an array of arguments from the command line.
     *
     * @param {string[]} args - The arguments from the command line
     */
    function asp(args) {
        // parse the arguments
        var yargs = {
            argv: yargs_parser_1.default(args),
        };
        // Skip ascii art if asked for the version
        if (!(yargs.argv.v || yargs.argv.version)) {
            console.log(chalk_2.default(templateObject_25 || (templateObject_25 = __makeTemplateObject(["{bold.bgWhite.black ", "       ___   _____                       __  \n      /   | / ___/      ____  ___  _____/ /_ \n     / /| | \\__ \\______/ __ \\/ _ \\/ ___/ __/ \n    / ___ |___/ /_____/ /_/ /  __/ /__/ /_   \n   /_/  |_/____/     / .___/\\___/\\___/\\__/   \n                    /_/                      }\n\n  \u26A1AS-pect\u26A1 Test suite runner {bgGreenBright.black [", "]}\n  "], ["{bold.bgWhite.black ",
                "       ___   _____                       __  \n      /   | / ___/      ____  ___  _____/ /_ \n     / /| | \\\\__ \\\\______/ __ \\\\/ _ \\\\/ ___/ __/ \n    / ___ |___/ /_____/ /_/ /  __/ /__/ /_   \n   /_/  |_/____/     / .___/\\\\___/\\\\___/\\\\__/   \n                    /_/                      }\n\n  \u26A1AS-pect\u26A1 Test suite runner {bgGreenBright.black [", "]}\n  "])), "", pkg.version));
        }
        // init script
        if (yargs.argv.i || yargs.argv.init) {
            console.log("");
            console.log(chalk_2.default(templateObject_26 || (templateObject_26 = __makeTemplateObject(["[Log] Initializing test suite files."], ["[Log] Initializing test suite files."]))));
            console.log("");
            // create the assembly folder if it doesn't exist
            var assemblyFolder = path_1.default.join(process.cwd(), "assembly");
            if (!fs_1.default.existsSync(assemblyFolder)) {
                console.log(chalk_2.default(templateObject_27 || (templateObject_27 = __makeTemplateObject(["[Log] Creating folder: ./assembly/"], ["[Log] Creating folder: ./assembly/"]))));
                fs_1.default.mkdirSync(assemblyFolder);
            }
            // Create the test folder if it doesn't exist
            var testFolder = path_1.default.join(process.cwd(), "assembly", "__tests__");
            if (!fs_1.default.existsSync(testFolder)) {
                console.log(chalk_2.default(templateObject_28 || (templateObject_28 = __makeTemplateObject(["[Log] Creating folder: ./assembly/__tests__/"], ["[Log] Creating folder: ./assembly/__tests__/"]))));
                fs_1.default.mkdirSync(testFolder);
                // create the example file only if the __tests__ folder does not exist
                var exampleFile = path_1.default.join(testFolder, "example.spec.ts");
                var exampleFileSource = path_1.default.join(__dirname, "..", "init", "example.spec.ts");
                if (!fs_1.default.existsSync(exampleFile)) {
                    console.log(chalk_2.default(templateObject_29 || (templateObject_29 = __makeTemplateObject(["[Log] Creating file: ./assembly/__tests__/example.spec.ts"], ["[Log] Creating file: ./assembly/__tests__/example.spec.ts"]))));
                    fs_1.default.createReadStream(exampleFileSource, "utf-8")
                        .pipe(fs_1.default.createWriteStream(exampleFile, "utf-8"));
                }
            }
            // create the types file if it doesn't exist for typescript tooling users
            var typesFileSource = path_1.default.join(__dirname, "..", "init", "as-pect.d.ts");
            var typesFile = path_1.default.join(testFolder, "as-pect.d.ts");
            if (!fs_1.default.existsSync(typesFile)) {
                console.log(chalk_2.default(templateObject_30 || (templateObject_30 = __makeTemplateObject(["[Log] Creating file: assembly/__tests__/as-pect.d.ts"], ["[Log] Creating file: assembly/__tests__/as-pect.d.ts"]))));
                fs_1.default.createReadStream(typesFileSource, "utf-8")
                    .pipe(fs_1.default.createWriteStream(typesFile, "utf-8"));
            }
            // create the default configuration file
            var configFile = path_1.default.join(process.cwd(), "as-pect.config.js");
            var configFileSource = path_1.default.join(__dirname, "..", "init", "as-pect.config.js");
            if (!fs_1.default.existsSync(configFile)) {
                console.log(chalk_2.default(templateObject_31 || (templateObject_31 = __makeTemplateObject(["[Log] Creating file: as-pect.config.js"], ["[Log] Creating file: as-pect.config.js"]))));
                fs_1.default.createReadStream(configFileSource, "utf-8")
                    .pipe(fs_1.default.createWriteStream(configFile, "utf-8"));
            }
        }
        else if (yargs.argv.v || yargs.argv.version) { // display the version
            console.log(pkg.version);
        }
        else if (yargs.argv.help || yargs.argv.h) { // display the help file
            console.log(chalk_2.default(templateObject_32 || (templateObject_32 = __makeTemplateObject(["\n  {bold.blueBright SYNTAX}\n    {bold.green asp} --config as-pect.config.js\n    {bold.green asp} -c as-pect.config.js\n    {bold.green asp} --init\n    {bold.green asp} -i\n    {bold.green asp} --version\n    {bold.green asp} -v\n\n  {bold.blueBright OPTIONS}\n    {bold.green --version, -v}         Prints the package version and exits.\n    {bold.green --help, -h}            Prints this message and exits.\n    {bold.green --config, -c}          Accepts a configuration file and runs the tests.\n    {bold.green --init, -i}            Creates a test config, an assembly/__tests__ folder and exits.\n  "], ["\n  {bold.blueBright SYNTAX}\n    {bold.green asp} --config as-pect.config.js\n    {bold.green asp} -c as-pect.config.js\n    {bold.green asp} --init\n    {bold.green asp} -i\n    {bold.green asp} --version\n    {bold.green asp} -v\n\n  {bold.blueBright OPTIONS}\n    {bold.green --version, -v}         Prints the package version and exits.\n    {bold.green --help, -h}            Prints this message and exits.\n    {bold.green --config, -c}          Accepts a configuration file and runs the tests.\n    {bold.green --init, -i}            Creates a test config, an assembly/__tests__ folder and exits.\n  "]))));
        }
        else { // run the compiler and test suite
            // obtain the configuration file
            var configurationPath = path_1.default.resolve(process.cwd(), yargs.argv.c || yargs.argv.config || "./as-pect.config.js");
            console.log(chalk_2.default(templateObject_33 || (templateObject_33 = __makeTemplateObject(["{bgWhite.black [Log]} using configuration ", ""], ["{bgWhite.black [Log]} using configuration ", ""])), configurationPath));
            var configuration_1 = null;
            try {
                configuration_1 = require(configurationPath);
            }
            catch (ex) {
                console.log("");
                console.log(chalk_2.default(templateObject_34 || (templateObject_34 = __makeTemplateObject(["{bgRedBright.black [Error]} There was a problem loading {bold [", "]}."], ["{bgRedBright.black [Error]} There was a problem loading {bold [", "]}."])), configurationPath));
                console.log(ex);
                process.exit(1);
            }
            // configuration must be an object
            if (!configuration_1) {
                console.log(chalk_2.default(templateObject_35 || (templateObject_35 = __makeTemplateObject(["{bgRedBright.black [Error]} configuration at {bold [", "]} is null or not an object."], ["{bgRedBright.black [Error]} configuration at {bold [", "]} is null or not an object."])), configurationPath));
                process.exit(1);
            }
            var reporter_1 = configuration_1.reporter || new DefaultReporter_2.DefaultReporter();
            // include all the file globs
            console.log("including files " + configuration_1.include.join(", "));
            var files_1 = [];
            // for each pattern
            for (var _i = 0, _a = configuration_1.include; _i < _a.length; _i++) {
                var pattern = _a[_i];
                // push all the resulting files
                files_1.push.apply(files_1, glob_1.default.sync(pattern));
            }
            // remove duplicate file locations
            files_1 = lodash_uniq_1.default(files_1);
            // run the regex tests to find excluded tests
            var disclude = configuration_1.disclude || [];
            disclude.forEach(function (regexp) {
                files_1 = files_1.filter(function (file) { return !regexp.test(file); });
            });
            ;
            // loop over each file and create a binary, index it on binaries
            var binaries_1 = {};
            // must include the assembly/index.ts file located in the package
            var entryPath = path_1.default.join(__dirname, "../assembly/index.ts");
            var relativeEntryPath_1 = path_1.default.relative(process.cwd(), entryPath);
            // Create a test runner, and run each test
            var failed_1 = false;
            var count_1 = files_1.length;
            var runner_1 = new TestRunner_1.TestRunner();
            // for each file, synchronously run each test
            files_1.forEach(function (file, i) {
                console.log("Compiling: " + file + " " + (i + 1).toString() + " / " + files_1.length.toString());
                // TODO: add compiler options?
                asc_1.default.main([
                    file, relativeEntryPath_1,
                    "--validate",
                    "--debug",
                    "--measure",
                    "--binaryFile", "output.wasm",
                ], {
                    // @ts-ignore: this is fine
                    stdout: process.stdout,
                    // @ts-ignore: this is fine
                    stderr: process.stderr,
                    writeFile: function (name, contents) {
                        // get the wasm file
                        if (path_1.default.extname(name) === ".wasm") {
                            binaries_1[i] = contents;
                        }
                    }
                }, function (error) {
                    // if there are any compilation errors, stop the test suite
                    if (error) {
                        console.log("There was a compilation error when trying to create the wasm binary for file: " + file + ".");
                        console.error(error);
                        process.exit(1);
                        return;
                    }
                    // if the binary wasn't emitted, stop the test suite
                    if (!binaries_1[i]) {
                        console.log("There was no output binary file: " + file + ". Did you forget to emit the binary?");
                        process.exit(1);
                        return;
                    }
                    // call run buffer because it's already compiled
                    runner_1.runBuffer(file, binaries_1[i], Object.assign({}, configuration_1.imports), reporter_1);
                    count_1 -= 1;
                    failed_1 = failed_1 || !runner_1.passed;
                    // if any tests failed, and they all ran, exit(1)
                    if (count_1 === 0 && failed_1) {
                        process.exit(1);
                    }
                });
            });
        }
    }
    exports.asp = asp;
    var templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_32, templateObject_33, templateObject_34, templateObject_35;
});
define("as-pect", ["require", "exports", "test/TestGroup", "test/TestResult", "test/TestRunner", "test/TestSuite", "reporter/DefaultReporter", "reporter/Reporter", "cli"], function (require, exports, TestGroup_2, TestResult_2, TestRunner_2, TestSuite_2, DefaultReporter_3, Reporter_2, cli_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(TestGroup_2);
    __export(TestResult_2);
    __export(TestRunner_2);
    __export(TestSuite_2);
    __export(DefaultReporter_3);
    __export(Reporter_2);
    __export(cli_1);
});
define("test", ["require", "exports", "cli"], function (require, exports, cli_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    cli_2.asp(process.argv.slice(2));
});
//# sourceMappingURL=as-pect.amd.js.map