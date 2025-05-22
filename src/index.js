const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

router.get('/hello', ctx => {
  ctx.body = { message: 'hello world' };
});


app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => console.log('Server running on http://localhost:3000'));


//------------------------------------------------------------------------------------//

const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/hello') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'hello world' }));
  }
   else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(3000, () => {
  console.log('Node server listening on port 3000');
});