const { getStoryContext } = require('@storybook/test-runner');

module.exports = {
  setup() {
    // Global setup before all tests
  },
  
  async preRender(page) {
    // Set viewport for better visibility
    await page.setViewportSize({ width: 1200, height: 800 });
  },
  
  async postRender(page, context) {
    // Add a small delay to see the tests running
    await page.waitForTimeout(500);
  },
  
  // Configure Playwright options
  testEnvironmentOptions: {
    'jest-playwright': {
      browsers: ['chromium'],
      launchOptions: {
        headless: false, // Show browser
        slowMo: 250,     // Slow down actions
        devtools: true   // Open DevTools
      }
    }
  }
};