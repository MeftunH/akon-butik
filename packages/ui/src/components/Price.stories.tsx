import type { Meta, StoryObj } from '@storybook/react';

import { Price } from './Price.js';

const meta: Meta<typeof Price> = {
  title: 'Atoms/Price',
  component: Price,
};

export default meta;

type Story = StoryObj<typeof Price>;

export const Default: Story = { args: { amount: { amountMinor: 12345, currency: 'TRY' } } };
export const Discounted: Story = {
  args: {
    amount: { amountMinor: 8950, currency: 'TRY' },
    oldAmount: { amountMinor: 12345, currency: 'TRY' },
  },
};
export const Large: Story = { args: { amount: 199.5, size: 'lg' } };
