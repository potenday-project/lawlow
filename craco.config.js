const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@stores": path.resolve(__dirname, "src/stores"),
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
