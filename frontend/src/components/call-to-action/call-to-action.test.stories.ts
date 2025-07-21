import type { Meta, StoryObj } from '@storybook/html';
import { Template, defaultArgs, argTypes } from './CallToAction.shared';

const meta: Meta = {
  title: 'Components/CallToAction/Tests',
  render: Template,
  args: defaultArgs,
  argTypes,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Test stories for the Call To Action component.'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const AccessibilityTest: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tests accessibility features of the Call To Action component.'
      }
    }
  }
};

export const ResponsiveTest: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tests responsive behavior of the Call To Action component.'
      }
    },
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1200px', height: '800px' } }
      }
    }
  }
};
