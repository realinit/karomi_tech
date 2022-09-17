const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const path = require("path");
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3003;
const sourceDir = process.env.SOURCE || "src";
const sourcePath = path.join(process.cwd(), sourceDir);
const outputPath = path.join(process.cwd(), "dist");
const mode =
  process.env.NODE_ENV == "production" ? process.env.NODE_ENV : "development";
module.exports = {
  context: __dirname,
  entry: {
    main: path.join(sourcePath, "./main.js"),
  },
  devtool: process.env.NODE_ENV == "development" ? "source-map" : "",
  output: {
    path: outputPath,
    filename: "[name].js",
    publicPath: "/",
  },
  devServer: {
    inline: true,
    port: port,
    host: host,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      modules: path.resolve(__dirname, "src/modules"),
      public: path.resolve(__dirname, "public/"),
      library: path.resolve(__dirname, "src/lib"),
      utils: path.resolve(__dirname, "src/utils"),
      viewObject: path.resolve(__dirname, "src/vo"),
      constants: path.resolve(__dirname, "src/constants"),
      hoc: path.resolve(__dirname, "src/hoc"),
      reducers: path.resolve(__dirname, "src/reducers"),
      containers: path.resolve(__dirname, "src/containers"),
      layout: path.resolve(__dirname, "src/layout"),
      store: path.resolve(__dirname, "src/store"),
      components: path.resolve(__dirname, "src/components"),
      actions: path.resolve(__dirname, "src/actions"),
      connect: path.resolve(__dirname, "src/connect"),
      shared: path.resolve(__dirname, "src/shared"),
      config: path.join(__dirname, `src/config/${process.env.NODE_ENV}.js`),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules\/(?!@kromi_tech).*/],
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "./../img/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "less-loader", // compiles Less to CSS
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "/fonts/webFonts/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.SERVICE_DOMAIN": JSON.stringify(process.env.SERVICE_DOMAIN),
      "process.env.SERVICE_PROTOCOL": JSON.stringify(
        process.env.SERVICE_PROTOCOl
      ),
      "process.env.BASE_HOST": JSON.stringify(process.env.BASE_HOST),
      "process.env.COOKIE_DOMAIN": JSON.stringify(process.env.COOKIE_DOMAIN),
      "process.env.DASHBOARD_HOST": JSON.stringify(process.env.DASHBOARD_HOST),
      "process.env.STATIC_BASE_URL": JSON.stringify(
        process.env.STATIC_BASE_URL
      ),
    }),
    new HtmlWebpackPlugin({
      template: "public/index.ejs",
      filename: "index.ejs",
      minify: true,
      chunksSortMode: "dependency",
      chunks: ["main", "vendor", "runtime"],
    }),
    new CompressionPlugin({
      include: ["main", "vendor"],
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8,
      compressionOptions: { level: 9 },
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  optimization: {
    // moduleIds: "hashed",
    runtimeChunk: "single",
    occurrenceOrder: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "all",
          priority: 1,
          name: "vendor",
        },
      },
    },
    minimize: false,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 6,
          mangle: true,
          warnings: false,
          output: {
            comments: false,
          },
        },
        sourceMap: true,
      }),
    ],
    removeAvailableModules: true,
  },
  mode,
};
