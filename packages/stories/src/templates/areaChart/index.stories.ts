import type { Meta, StoryObj } from "@storybook/react";

import { AreaChartTemplate } from "./AreaChart";

const meta = {
  title: "Templates/AreaChart",
  component: AreaChartTemplate,
  argTypes: {
    width: {
      control: { type: "number" },
    },
    height: {
      control: { type: "number" },
    },
  },
} satisfies Meta<typeof AreaChartTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Template: Story = {
  args: {},
};
