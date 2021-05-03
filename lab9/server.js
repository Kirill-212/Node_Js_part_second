const app = require("express")();
const https = require("https");
const fs = require("fs");

const PORT = 3000;

let options = {
  key: fs.readFileSync(`${__dirname}/LAB1.key`).toString(),
  cert: fs.readFileSync(`${__dirname}/LAB1.crt`).toString(),
};

app.get("/", (req, res) => {
  console.log("yes");
  res.send("hello from https");
});

https
  .createServer(options, app)
  .listen(PORT, () => {
    console.log(`https://localhost:${PORT}`);
  })
  .on("error", (e) => {
    console.log(`Error: ${e.code}`);
  });
