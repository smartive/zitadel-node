export default {
  // files: ['test/**/*.test.ts'],
  verbose: true,
  // require: ['ts-node/register'],
  typescript: {
    extensions: ['ts'],
    rewritePaths: {
      'src/': 'dist/',
    },
    compile: false,
  },
};
