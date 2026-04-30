import type { Preview } from '@storybook/react';

import 'bootstrap/dist/css/bootstrap.min.css';

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    options: {
      storySort: { order: ['Atoms', 'Molecules', 'Organisms', 'Pages'] },
    },
  },
};

export default preview;
