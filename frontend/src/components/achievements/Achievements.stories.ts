import type { Meta, StoryObj } from '@storybook/html';
import { AchievementsArgs, Template, defaultArgs } from './Achievements.shared';
import './achievements'; // This line is crucial!

const meta: Meta<AchievementsArgs> = {
  title: 'Components/Achievements',
  tags: ['autodocs'],
  parameters: {
    controls: {
      expanded: true,
      sort: 'requiredFirst'
    },
    docs: {
      description: {
        component: 'A component that displays achievement icons in a visual layout. Shows four achievement icons by default.'
      }
    }
  },
  args: defaultArgs
};

export default meta;
type Story = StoryObj<AchievementsArgs>;

/**
 * The default achievements display showing all four achievement icons
 */
export const Default: Story = {
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'The default achievements component displays all four achievement icons.'
      }
    }
  }
};
