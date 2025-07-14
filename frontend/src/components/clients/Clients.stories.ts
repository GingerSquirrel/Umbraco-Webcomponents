import type { Meta, StoryObj } from '@storybook/html';
import { ClientsArgs, Template, defaultArgs, argTypes } from './Clients.shared';
// Import the component so it's registered
import './clients';

const meta: Meta<ClientsArgs> = {
  title: 'Components/Clients',
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true }, // Disable controls since we're not using args
    docs: {
      description: {
        component: 'A component that displays client logos. Shows trusted partners and client relationships.'
      }
    }
  },
  args: defaultArgs,
  argTypes
};

export default meta;
type Story = StoryObj<ClientsArgs>;

/**
 * The default clients display
 */
export const Default: Story = {
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'The default clients component displays all client logos.'
      }
    }
  }
};
