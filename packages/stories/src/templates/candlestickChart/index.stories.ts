import type { Meta, StoryObj } from "@storybook/react";

import { CandlestickChartTemplate } from "./CandlestickChart";

const meta = {
  title: "Templates/CandlestickChart",
  component: CandlestickChartTemplate,
  argTypes: {
    width: {
      control: { type: "number" },
    },
    height: {
      control: { type: "number" },
    },
  },
} satisfies Meta<typeof CandlestickChartTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Template: Story = {
  args: {},
};
