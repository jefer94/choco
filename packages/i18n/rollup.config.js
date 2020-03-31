import resolve from 'rollup-plugin-node-resolve'
import sourcemaps from 'rollup-plugin-sourcemaps'
import babel from 'rollup-plugin-babel'

const module = 'i18n'

export default {
  input: 'src/index.js',
  output: [
    {
      file: `dist/${module}.esm.js`,
      format: 'es',
      sourcemap: true
    },
    {
      file: `dist/${module}.cjs.js`,
      format: 'commonjs',
      preferConst: true,
      sourcemap: true
    },
    {
      file: `dist/${module}.amd.js`,
      format: 'amd',
      sourcemap: true
    },
    {
      file: `dist/${module}.umd.js`,
      format: 'umd',
      name: `@choco/${module}`,
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
}