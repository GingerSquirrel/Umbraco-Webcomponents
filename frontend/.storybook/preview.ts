import type { Preview } from '@storybook/html-vite';
import '../src/main.scss'; // Import your global styles
import '../src/global/styles/variables.scss'; // Import your global variables
import '../src/components/button/button.ts'


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;