module.exports = {
	setupFiles: ['<rootDir>/tests/setupTests.js'],
	transform: {
		'^.+\\.(js|jsx)$': 'babel-jest',
		'^.+\\.(css|scss|less)$': 'jest-transform-css',
	},
};
