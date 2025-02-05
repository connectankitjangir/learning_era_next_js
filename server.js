const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const app = next({ dev: false }); // Production mode
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3005; // Use cPanel-assigned port

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});

