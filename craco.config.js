require("react-scripts/config/env");
const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@stores": path.resolve(__dirname, "src/stores"),
      "@interface": path.resolve(__dirname, "src/interface"),
      "@style": path.resolve(__dirname, "src/style"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@api": path.resolve(__dirname, "src/api"),
    },
  },
  babel: {
    plugins: [
      ["@babel/plugin-transform-class-properties", { loose: false }],
      ["@babel/plugin-transform-private-methods", { loose: false }],
      ["@babel/plugin-transform-private-property-in-object", { loose: false }],
    ],
    assumptions: {
      setPublicClassFields: false,
    },
  },
};
