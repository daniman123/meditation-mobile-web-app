import type { Meta, StoryObj } from "@storybook/react";

import AudioPlayer from "./AudioPlayer";
import { mockAudioPlayerProps } from "./AudioPlayer.mocks";

const meta: Meta<typeof AudioPlayer> = {
  component: AudioPlayer,
};

export default meta;
type Story = StoryObj<typeof AudioPlayer>;

export const Primary: Story = {
  args: {
    ...mockAudioPlayerProps.base,
  },
};
