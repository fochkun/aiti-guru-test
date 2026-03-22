import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use('/api', createProxyMiddleware({
  target: 'https://dummyjson.com',
  changeOrigin: true,
  // http-proxy-middleware по умолчанию использует HTTP/1.1
  onProxyReq: (proxyReq, req) => {
    console.log('new request')
    proxyReq.setHeader('Connection', 'keep-alive');
  }
}));

app.listen(3001, () => {
  console.log('Прокси запущен: http://localhost:3001/api');
});