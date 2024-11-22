module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // Test environment to simulate the browser
    testEnvironment: "jsdom",

    // Paths to modules that run before each test
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],

    // Transform settings for modern JavaScript and React JSX
    transform: {
        "^.+\\.[tj]sx?$": "babel-jest", // Use Babel for transforming tests
    },

    // Ignore transforming certain modules (but include ES modules like Axios)
    transformIgnorePatterns: [
        "/node_modules/(?!axios)/", // Include Axios for transformation
    ],

    // Mock non-JS files like CSS and images
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock styles
        "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__mocks__/fileMock.js", // Mock static assets
    },

    // Coverage settings
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}", // Collect coverage from all JS/TS files
        "!src/**/*.d.ts", // Exclude TypeScript declaration files
        "!src/index.js", // Exclude entry points
        "!src/**/setupTests.js", // Exclude setup files
    ],
    coverageDirectory: "coverage",

    // Supported file extensions for modules
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
};
