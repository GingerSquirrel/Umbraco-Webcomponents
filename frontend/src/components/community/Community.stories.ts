import type { Meta, StoryObj } from '@storybook/html';
import { CommunityArgs, Template, defaultArgs, argTypes } from './Community.shared';
// Import the component so it's registered
import './community';

const meta: Meta<CommunityArgs> = {
  title: 'Components/Community',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true }, // Disable controls since we're not using args
    docs: {
      description: {
        component: 'A component that displays community information and engagement features.'
      }
    }
  },
  args: defaultArgs,
  argTypes
};

export default meta;
type Story = StoryObj<CommunityArgs>;

/**
 * The default community display
 */
export const Default: Story = {
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'The default community component displays community information.'
      }
    }
  }
};

