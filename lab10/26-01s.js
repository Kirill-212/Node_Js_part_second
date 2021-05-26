const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const { ServerDH } = require("./m24-07");

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
let serverDH;

app.get("/", (req, res) => {
  serverDH = new ServerDH(1024, 3);
  const serverContext = serverDH.getContext();
  res.json(serverContext);
});

app.get("/resourse", (req, res) => {
  try {
    let context = req.body;
    if (serverDH && context) {
      const serverSecret = serverDH.getSecret(context);

      const cipher = crypto.createCipher("aes256", serverSecret.toString());
      const text = fs.readFileSync(`${__dirname}/file.txt`, {
        encoding: "utf8",
      });
      console.log("file data  ", text);
      const encrypted =
        cipher.update(text, "utf8", "hex") + cipher.final("hex");

      res.json({ txt: encrypted });
    } else {
      res.status(409).json({ msg: "Deffi-Hellman error" });
    }
  } catch {
    res.status(409).json({ msg: "Deffi-Hellman error" });
  }
});

app
  .listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.log(`ERROR: ${err.code}`);
  });
