import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import babel from 'rollup-plugin-babel';


export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/components.esm.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: 'dist/components.cjs.js',
      format: 'commonjs',
      preferConst: true,
      sourcemap: true
    }
  ],
  external: (id) => !/^(\.|\/)/.test(id),
  plugins: [
    resolve(),
    // babel(),
    babel({
      exclude: 'node_modules/**'
    }),
    sourcemaps()
  ]
};