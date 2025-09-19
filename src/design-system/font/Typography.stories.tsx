import type { Meta, StoryObj } from "@storybook/nextjs";
import { fonts, fontSizes } from "./tokens";

const meta: Meta = {
    title: "Design System/Typography",
};
export default meta;
type Story = StoryObj;

export const Typography: Story = {
    render: () => (
        <div style={{ display: "grid", gap: "16px" }}>
            {Object.entries(fontSizes).map(([label, size]) => (
                <div key={label}>
                    <div
                        style={{
                            fontFamily: fonts.sans,
                            fontSize: size,
                            lineHeight: 1.4,
                        }}
                    >
                        {label} – The quick brown fox jumps over the lazy dog
                    </div>
                </div>
            ))}
        </div>
    ),
};
