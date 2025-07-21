import type { Meta, StoryObj } from '@storybook/html';
import { ImageAndTextArgs, Template, defaultArgs, argTypes } from './ImageAndText.shared';
// Import the component so it's registered
import './image-and-text';

const meta: Meta<ImageAndTextArgs> = {
  title: 'Components/ImageAndText',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true }, // Disable controls since we're not using args
    docs: {
      description: {
        component: 'A component that displays image and text content together. Shows content with visual and textual elements.'
      }
    }
  },
  args: defaultArgs,
  argTypes
};

export default meta;
type Story = StoryObj<ImageAndTextArgs>;

/**
 * The default image and text display
 */
export const Default: Story = {
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'The default image and text component displays content with both visual and textual elements.'
      }
    }
  }
};
