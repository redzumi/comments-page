import path                      from 'path';
import webpack                   from 'webpack';
import express                   from 'express';

import webpackConfig             from '../../../webpack.config';

import devMiddleware             from 'webpack-dev-middleware';
import hotMiddleware             from 'webpack-hot-middleware';

const PORT            = 3000;
const isProd          = (process.env.ENV == 'production');

const app             = express();
const compiler        = webpack(webpackConfig);

let enableHMR = () => {
  app.use(devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath }));
  app.use(hotMiddleware(compiler));
};

if(!isProd) enableHMR();

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT);
