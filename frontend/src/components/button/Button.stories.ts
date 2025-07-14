import type { Meta, StoryObj } from '@storybook/html';
import { ButtonArgs, Template, defaultArgs } from './Button.shared';

const meta: Meta<ButtonArgs> = {
  title: 'Elements/Button',
  tags: ['autodocs'],
  args: defaultArgs
};

export default meta;
type Story = StoryObj<ButtonArgs>;

// Basic story to test controls
export const Primary: Story = {
  render: Template
};

export const Secondary: Story = {
  render: Template,
  args: {
    class: 'secondary',
    label: 'Secondary Button'
  }
};

export const Tertiary: Story = {
  render: Template,
  args: {
    class: 'tertiary',
    label: 'Tertiary Button'
  }
};

export const Label: Story = {
  render: Template,
  args: {
    class: 'label',
    label: 'Label Button'
  }
};

export const Disabled: Story = {
  render: Template,
  args: {
    label: 'Disabled Button',
    class: 'primary',
    disabled: true
  }
};
