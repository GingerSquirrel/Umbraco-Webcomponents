import type { Meta, StoryObj } from '@storybook/html';
import { createComponent } from '../CreateComponent';
import './call-to-action.scss';

// Register component
createComponent('CallToActionComponent', () => import('./call-to-action'));

const meta: Meta = {
  title: 'Components/CallToAction',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Description of what this component does.'
      }
    }
  },
  argTypes: {
    // Define controls for component properties
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => `
    <call-to-action-component></call-to-action-component>
  `
};

export const WithVariant: Story = {
  render: (args) => `
    <call-to-action-component class="variant"></call-to-action-component>
  `
};
