const babel = require("@babel/core");
const plugin = require("./plugin");

const input = `
const x = 1, {y} = x;
`;

const output = babel.transformSync(input, {
  presets: [{ plugins: [plugin] }, "@babel/preset-env"],
  babelrc: false,
  configFile: false
}).code;

console.log(input);
console.log("===================");
console.log(output);
