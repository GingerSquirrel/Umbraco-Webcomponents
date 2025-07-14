import type { Meta, StoryObj } from '@storybook/html';
import { MenuArgs, Template, defaultArgs, argTypes } from './Menu.shared';
// Import the component so it's registered
import './menu';

const meta: Meta<MenuArgs> = {
  title: 'Components/Menu',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true }, // Disable controls since we're not using args
    docs: {
      description: {
        component: 'A component that displays navigation menu. Shows menu items and navigation links.'
      }
    }
  },
  args: defaultArgs,
  argTypes
};

export default meta;
type Story = StoryObj<MenuArgs>;

/**
 * The default menu display
 */
export const Default: Story = {
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'The default menu component displays navigation menu items.'
      }
    }
  }
};