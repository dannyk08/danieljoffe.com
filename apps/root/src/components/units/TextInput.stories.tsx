import type { Meta, StoryObj } from '@storybook/react';
import TextInput from './TextInput';

const meta = {
  component: TextInput,
  title: 'Components/TextInput',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password'],
    },
    required: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    success: {
      control: 'boolean',
    },
    error: {
      control: 'text',
    },
    hint: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
  },
  args: {
    type: 'text',
  },
  decorators: [
    (Story, { args }) => {
      return (
        <div className='flex p-4'>
          <Story {...args} />
        </div>
      );
    },
  ],
  // tags: ['autodocs'],
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email Address',
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    name: 'email',
    type: 'email',
    error: 'Please enter a valid email address',
    value: 'invalid-email',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Password',
    name: 'password',
    type: 'password',
    hint: 'Must be at least 8 characters long',
  },
};

export const Success: Story = {
  args: {
    label: 'Email Address',
    name: 'email',
    type: 'email',
    success: true,
    value: 'user@example.com',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Email Address',
    name: 'email',
    type: 'email',
    disabled: true,
    value: 'user@example.com',
  },
};

export const Required: Story = {
  args: {
    label: 'Email Address',
    name: 'email',
    type: 'email',
    required: true,
  },
};
