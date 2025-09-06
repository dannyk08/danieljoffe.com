import type { Meta } from '@storybook/react';
import LinkHint from './LinkHint';

const meta = {
  component: LinkHint,
  title: 'Components/LinkHint',
  parameters: {
    layout: 'centered',
  },
  // tags: ['autodocs'],
} satisfies Meta<typeof LinkHint>;

export default meta;

export const Default = {
  args: {
    href: 'https://example.com',
  },
  render: (props: any) => (
    <a
      {...(props as any)}
      className='flex items-center gap-2 text-blue-600 hover:text-blue-800'
    >
      Visit External Site
      <LinkHint />
    </a>
  ),
};
