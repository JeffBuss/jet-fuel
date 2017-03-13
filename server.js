const http = require("http");

const server = http.createServer()

server.listen(3000, 'localhost');

let counter = 0;

server.on('request', (request, response) => {
  response.writeHead(200, { "Content-Type": 'text/plain' });
  response.write("Hello World\n");
  response.write(`This is Request #${++counter}.`);
  response.end();
});
