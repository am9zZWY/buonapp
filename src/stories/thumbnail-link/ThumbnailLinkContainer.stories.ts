import type { Meta, StoryObj } from '@storybook/vue3'

import BaThumbnailLink from './ThumbnailLink.vue'
import BaThumbnailLinkContainer from './ThumbnailLinkContainer.vue'

const meta = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/configure/#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'BuonApp/ThumbnailLinkContainer',
  component: BaThumbnailLinkContainer,
  render: (args: any) => ({
    components: { BaThumbnailLinkContainer: BaThumbnailLinkContainer, BaThumbnailLink: BaThumbnailLink },
    setup() {
      return { args }
    },
    template: `
      <ba-thumbnail-link-container v-bind="args">
        <ba-thumbnail-link alt="thumbnail" />
        <ba-thumbnail-link alt="thumbnail" />
      </ba-thumbnail-link-container>   
    `
  }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs']
} satisfies Meta<typeof BaThumbnailLinkContainer>

export default meta
type Story = StoryObj<typeof meta>

export const ThumbnailLinkContainer: Story = {
  args: {
    title: 'Title',
  }
}
