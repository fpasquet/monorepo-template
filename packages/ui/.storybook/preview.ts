import type { Preview } from '@storybook/nextjs-vite';

import './global.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default preview;
