import type { StorybookConfig } from '@storybook/html-vite';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    '@storybook/addon-essentials', // This includes controls
    '@storybook/addon-controls' // Add this explicitly to ensure controls work
  ],
  framework: {
    "name": "@storybook/html-vite",
    "options": {}
  },
  viteFinal: async (config) => {
    config.base = '/storybook/';
    return config;
  }
};

export default config;