import path from 'path';
import { CracoConfig } from '@craco/types';

// TODO: alias 적용 여부 확인 필요
const config: CracoConfig = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/api': path.resolve(__dirname, 'src/api'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/axios': path.resolve(__dirname, 'src/axios'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/constants': path.resolve(__dirname, 'src/constants'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/pages': path.resolve(__dirname, 'src/pages'),
      '@/redux': path.resolve(__dirname, 'src/redux'),
      '@/router': path.resolve(__dirname, 'src/router'),
      '@/scss': path.resolve(__dirname, 'src/scss'),
      '@/services': path.resolve(__dirname, 'src/services'),
      '@/types': path.resolve(__dirname, 'src/types'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
        @use 'src/scss/base/mixins' as mixins;
        @use 'src/scss/base/variables' as *;
      `,
      },
    },
  },
};

export default config;
