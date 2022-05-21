import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

const plugins = [
  resolve({ preferBuiltins: false }),
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'runtime'
  }),
  terser()
];

const external = [
  'react',
  'react-dom'
];

const config = {
  input: './src/useBreakpoint/index.js',
  output: [
    {
      file: 'dist/esm/index.js',
      format: 'esm'
    },
    {
      file: 'dist/cjs/index.js',
      format: 'cjs'
    }
  ],
  plugins,
  external
};

export default config;
