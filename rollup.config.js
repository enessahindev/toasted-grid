import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
      exports: "named" // 🚀 Named export hatasını önler
    },
    {
      file: "dist/index.cjs",
      format: "cjs",
      sourcemap: true,
      exports: "named" // 🚀 Named export hatasını önler
    }
  ],
  external: ["react", "react-dom"],
  plugins: [
    resolve({ extensions: [".js", ".jsx", ".ts", ".tsx"] }),
    commonjs(),
    postcss(),
    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      exclude: "node_modules/**"
    }),
    terser()
  ]
};
