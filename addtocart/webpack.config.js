const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const { microeFrontends } = require("../config.project");
const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: `http://localhost:${microeFrontends.addtocart.port}/`,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: microeFrontends.addtocart.port,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "addtocart",
      filename: "remoteEntry.js",
      remotes: {
        // home: `home@http://localhost:${microeFrontends.home.port}/remoteEntry.js`,
        // pdp: `pdp@http://localhost:${microeFrontends.pdp.port}/remoteEntry.js`,
        cart: `cart@http://localhost:${microeFrontends.cart.port}/remoteEntry.js`,
      },
      exposes: {
        // "./addToCartCmp": "./src/addToCartCmp.jsx",
        "./placeAddToCart": "./src/placeAddToCart.js",
      },
      shared: {
        ...deps,
        "solid-js": {
          singleton: true,
          requiredVersion: deps["solid-js"],
        },
        rxjs: {
          singleton: true,
          requiredVersion: deps.rxjs,
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
