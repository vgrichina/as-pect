const { SummaryReporter } = require("./lib/reporter/SummaryReporter");

module.exports = {
  /**
   * A set of globs passed to the glob package that qualify typescript files for testing.
   */
  include: ["assembly/__tests__/**/*.spec.ts"],
  /**
   * A set of globs passed to the glob package that quality files to be added to each test.
   */
  add: ["assembly/__tests__/**/*.include.ts"],
  /**
   * All the compiler flags needed for this test suite. Make sure that a binary file is output.
   */
  flags: {
    "--validate": [],
    "--debug": [],
    /** This is required. Do not change this. */
    "--binaryFile": ["output.wasm"],
    /** This will output the wat files for inspection. */
    "--textFile": ["output.wat"],
  },
  /**
   * A set of regexp that will disclude source files from testing.
   */
  disclude: [/node_modules/i],
  /**
   * Add your required AssemblyScript imports here.
   */
  imports: {},
  /**
   * All performance statistics reporting can be configured here.
   */
  performance: {
    /** Enable performance statistics gathering. */
    enabled: false,
    /** Set the maximum number of samples to run for each test. */
    maxSamples: 1000,
    /** Set the number of decimal places to round to. */
    roundDecimalPlaces: 3,
    /** Set the maximum test run time in milliseconds. */
    maxTestRunTime: Infinity,
    /** Report the median time in the default reporter. */
    reportMedian: true,
    /** Report the average time in milliseconds. */
    reportAverage: true,
    /** Report the standard deviation. */
    reportStandardDeviation: true,
    /** Report the maximum run time in milliseconds. */
    reportMax: true,
    /** Report the minimum run time in milliseconds. */
    reportMin: true,
    /** Report the variance. */
    reportVariance: true,
  },
  /** Report the compiler flags to stdout. */
  compilerFlags: true,
  /** Use the summary reporter. */
  reporter: new SummaryReporter(),
};
