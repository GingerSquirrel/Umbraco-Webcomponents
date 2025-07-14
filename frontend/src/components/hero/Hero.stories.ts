import type { Meta, StoryObj } from '@storybook/html';
import { HeroArgs, Template, defaultArgs, argTypes } from './Hero.shared';
// Import the component so it's registered
import './hero';

const meta: Meta<HeroArgs> = {
  title: 'Components/Hero',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true }, // Disable controls since we're not using args
    docs: {
      description: {
        component: 'A component that displays hero section content. Shows main page banner and call-to-action elements.'
      }
    }
  },
  args: defaultArgs,
  argTypes
};

export default meta;
type Story = StoryObj<HeroArgs>;

/**
 * The default hero display
 */
export const Default: Story = {
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'The default hero component displays the main hero section.'
      }
    }
  }
};