// https: //github.com/facebook/create-react-app/issues/6794
// https: //www.wangshenjie.com/index.php/archives/164/
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/srapi",
    createProxyMiddleware({
      // target: "http://www.subreddit.com", // process.env.REACT_APP_PROXY_ENDPOINT
      target: "http://www.reddit.com", // process.env.REACT_APP_PROXY_ENDPOINT
      changeOrigin: true,
      pathRewrite: {
        "^/srapi": "",
      },
      followRedirects: true,
      // onProxyRes: function (proxyRes, req, res) {
      //   res.header("Access-Control-Allow-Origin", "http://localhost");
      //   res.header("Access-Control-Allow-Credentials", "true");
      // },
    })
  );
};
