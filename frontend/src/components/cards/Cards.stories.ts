import type { Meta, StoryObj } from '@storybook/html';
import { CardsArgs, Template, defaultArgs, argTypes } from './Cards.shared';
// Import the component so it's registered
import './cards';

const meta: Meta<CardsArgs> = {
  title: 'Components/Cards',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true }, // Disable controls since we're not using args
    docs: {
      description: {
        component: 'A component that displays card content. Shows card layouts with content sections.'
      }
    }
  },
  args: defaultArgs,
  argTypes
};

export default meta;
type Story = StoryObj<CardsArgs>;

/**
 * The default cards display
 */
export const Default: Story = {
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'The default cards component displays card content and layouts.'
      }
    }
  }
};