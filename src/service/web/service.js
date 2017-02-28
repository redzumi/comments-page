import path                       from 'path';
import webpack                    from 'webpack';
import express                    from 'express';
import compression                from 'compression';

import webpackConfig, { options } from '../../../hmr.webpack.config';

import devMiddleware              from 'webpack-dev-middleware';
import hotMiddleware              from 'webpack-hot-middleware';

const app             = express();
const compiler        = webpack(webpackConfig);

let enableHMR = () => {
  app.use(devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath }));
  app.use(hotMiddleware(compiler));
};

if(options.prod)  app.use(compression());
if(!options.prod) enableHMR();

app.use('/assets', express.static('assets'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(options.port);
