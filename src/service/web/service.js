import Koa                      from 'koa';
import Router                   from 'koa-router';
import send                     from 'koa-send';

const app             = new Koa();
const router          = new Router();

const PORT            = 3000;
const isProd          = (process.env.ENV == 'production');

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.request.ip.replace(/^.*:/, '')} ${ctx.method} ${ctx.url} - ${ms}`);
});

router.get('/assets*', (ctx) => {
  if(isProd) ctx.set('Content-Encoding', 'gzip');
  return send(ctx, ctx.path, { root: __dirname });
});

router.get('/*', async (ctx, next) => {
  await next();
  return send(ctx, 'index.html');
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT);
