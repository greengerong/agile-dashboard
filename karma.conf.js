
//cd current flode;karma start;


// base path, that will be used to resolve files and exclude
basePath = "";

preprocessors = {
    'public/js/**/*.js': 'coverage'  
};

// list of files / patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,
  'public/js/3plib/**/*.js',
  'public/js/app.js',
  'public/js/**/*.js',
  'test/3plib/**/*.js',
  'test/spec/**/*.js'
];

// list of files to exclude
exclude = [
      
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress', 'coverage', 'junit'];


// web server port
port = 9898;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = false;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = false;

junitReporter = {
    // will be resolved to basePath (in the same way as files/exclude patterns)
    outputFile: 'test/output/test-results.xml'
};

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ["Chrome"];//, "Chrome"


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 5000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = true;

coverageReporter = {
        type : 'html',
        dir : 'test/output/coverage/'
      };