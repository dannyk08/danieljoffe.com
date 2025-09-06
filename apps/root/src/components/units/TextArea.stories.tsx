import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextArea } from './TextArea';
import { expect } from 'storybook/test';

const meta = {
  component: TextArea,
  title: 'TextArea',
} satisfies Meta<typeof TextArea>;
export default meta;

type Story = StoryObj<typeof TextArea>;

export const Primary = {
  args: {},
} satisfies Story;

export const Heading = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/TextArea/gi)).toBeTruthy();
  },
} satisfies Story;
