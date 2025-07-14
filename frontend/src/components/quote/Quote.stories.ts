import type { Meta, StoryObj } from '@storybook/html';
import { QuoteArgs, Template, defaultArgs, argTypes } from './Quote.shared';
// Import the component so it's registered
import './quote';

const meta: Meta<QuoteArgs> = {
  title: 'Components/Quote',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true }, // Disable controls since we're not using args
    docs: {
      description: {
        component: 'A component that displays quote content. Shows testimonials and quoted text with attribution.'
      }
    }
  },
  args: defaultArgs,
  argTypes
};

export default meta;
type Story = StoryObj<QuoteArgs>;

/**
 * The default quote display
 */
export const Default: Story = {
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'The default quote component displays testimonials and quoted content.'
      }
    }
  }
};