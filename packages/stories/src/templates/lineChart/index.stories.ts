import type { Meta, StoryObj } from "@storybook/react";

import { LineChartTemplate } from "./LineChart";

const meta = {
  title: "Templates/LineChart",
  component: LineChartTemplate,
  argTypes: {
    width: {
      control: { type: "number" },
    },
    height: {
      control: { type: "number" },
    },
  },
} satisfies Meta<typeof LineChartTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Template: Story = {
  args: {},
};
