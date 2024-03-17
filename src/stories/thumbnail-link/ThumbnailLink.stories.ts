import type { Meta, StoryObj } from '@storybook/vue3'

import BaThumbnailLink from './ThumbnailLink.vue'

const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'BuonApp/ThumbnailLink',
  component: BaThumbnailLink,
  render: (args: any) => ({
    components: { BaThumnailLink: BaThumbnailLink },
    setup() {
      return { args }
    },
    template: '<ba-thumnail-link :src="args.src" />'
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs']
} satisfies Meta<typeof BaThumbnailLink>

export default meta
type Story = StoryObj<typeof meta>

export const ThumbnailLink: Story = {
  args: {}
}
