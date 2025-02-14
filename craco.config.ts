import path from 'path';
import { CracoConfig } from '@craco/types';

const config: CracoConfig = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@axios': path.resolve(__dirname, 'src/axios'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@scss': path.resolve(__dirname, 'src/scss'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
        @use 'src/scss/base/mixins' as *;
        @use 'src/scss/base/variables' as *;
      `,
      },
    },
  },
};

export default config;
