const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Set the API base URL from the environment variable
const target = process.env.LABCAS_WORKFLOW_API_BASE_URL

//const referer = 'http://localhost';
// with a live server in cursor
const referer = 'http://127.0.0.1:5500';
const allowed_methods = 'GET, POST, PUT, DELETE, OPTIONS';
const allowed_headers = 'Authorization, authorization, Origin, X-Requested-With, Content-Type, Accept';


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', referer);
  res.setHeader('Access-Control-Allow-Methods', allowed_methods);
  res.setHeader('Access-Control-Allow-Headers', allowed_headers);

  if (req.method === 'OPTIONS') {
      res.sendStatus(204);
  }
  else {
    next();
  }
});


// Log incoming API requests
app.use('/api', (req, res, next) => {
  console.log(`[Proxy Request] ${req.method} ${req.originalUrl}`);
  console.log('Original Request Header Keys:');
  Object.keys(req.headers).forEach(function (key) {
    console.log(key); // Log each request header key
  });
  next(); // continue to the proxy
});


app.use('/api', createProxyMiddleware({
  target: target,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // remove /api from the URL when forwarding
  },
  logLevel: 'debug',
  preserveHeaderKeyCase: true,
  on: {
    proxyReq: (proxyReq, req, res) => {
      // Log the full path being sent to the target
      console.log(`[Proxy Sent] ${req.method} ${target}${req.url}`);
      // Iterate and print each key-value pair
      //req.headers.forEach(([key, value]) => {
      //  console.log(`Header Key: ${key}, Value: ${value}`);
      //});
      console.log('forwarded Request Header Keys:');
      Object.keys(req.headers).forEach(function (key) {
        console.log(key); // Log each request header key
      });
    },

    proxyRes: (proxyRes, req, res) => {
      console.log(`[Proxy Response] ${req.method} ${req.originalUrl} → ${proxyRes.statusCode}`);
    },

    error: (err, req, res) => {
      console.error(`[Proxy Error] ${req.method} ${req.originalUrl} → ${err.message}`);
    },
  }

}));



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy listening on http://localhost:${PORT}, forwarding to ${target}`);
});
