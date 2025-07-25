import type { Meta, StoryObj } from '@storybook/html';
import { FooterArgs, Template, defaultArgs, argTypes } from './Footer.shared';
// Import the component so it's registered
import './footer';

const meta: Meta<FooterArgs> = {
  title: 'Components/Footer',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true }, // Disable controls since we're not using args
    docs: {
      description: {
        component: 'A footer component that displays site footer information and links.'
      }
    }
  },
  args: defaultArgs,
  argTypes
};

export default meta;
type Story = StoryObj<FooterArgs>;

/**
 * The default footer display
 */
export const Default: Story = {
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'The default footer component displays footer information.'
      }
    }
  }
};
