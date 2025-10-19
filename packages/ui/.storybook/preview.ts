import type { Preview } from '@storybook/nextjs';
import './global.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default preview;
