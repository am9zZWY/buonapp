import type { Meta, StoryObj } from '@storybook/vue3'

import Search from './Search.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'BuonApp/Search',
  component: Search,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs']
} satisfies Meta<typeof Search>

export default meta

type Story = StoryObj<typeof meta>

export const NormalSearch: Story = {}
