import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button.js';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'outline', 'ghost'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: 'primary', children: 'Sepete Ekle' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Devam Et' } };
export const Outline: Story = { args: { variant: 'outline', children: 'İptal' } };
export const Loading: Story = { args: { loading: true, children: 'Kaydediliyor…' } };
