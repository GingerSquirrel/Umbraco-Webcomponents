import type { Meta, StoryObj } from '@storybook/html';
import { Template, defaultArgs, argTypes, FooterArgs } from './Footer.shared';
import '../footer';

const meta: Meta<FooterArgs> = {
  title: 'Components/Footer/Test',
  render: Template,
  argTypes,
  args: defaultArgs,
};

export default meta;
type Story = StoryObj<FooterArgs>;

export const Test: Story = {};
