import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
      '../src/components/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-viewport',
  ],
  staticDirs: ['../public'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  webpackFinal: async (config) => {
    const cssRule = config.module?.rules?.find((rule) =>
        typeof rule === 'object' && rule?.test?.toString().includes('css')
    );

    if (cssRule && typeof cssRule === 'object') {
      cssRule.exclude = /\.module\.css$/;
    }

    return config;
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};

export default config;