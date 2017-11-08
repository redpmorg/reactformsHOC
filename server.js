const http = require('http');
import config from './config.js';
import webpackServer from './webpack-dev-server';

const server = http.createServer((req, res) => {
  res.writeHeader(200, {"Content-Type": "text/html"});
  if(req.url.match('favicon.ico')) {
    return res.end();
  }

  res.write(
    `<!DOCTYPE html>
      <html>
        <head>
          <meta charSet="utf-8" />
	  <title>React Form serialize with HOC</title>
        </head>
        <body>
          <div id="app-wrapper"></div>
          <script type="text/javascript"
            src="http://${config.hostname}:${config.port+1}/static/bundle.js">
          </script>
        </body>
      </html>`);
    res.end();
});

webpackServer(config);

server.listen(config.port, config.hostname, ()=>{
  console.log(`Server run at http://${config.hostname}:${config.port}`);
});
