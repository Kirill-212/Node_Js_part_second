const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const { ServerSign } = require("./m24-07-02");

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
let serverDH;

app.get("/signature", (req, res) => {
  try {
    const text = fs.createReadStream(`${__dirname}/file.txt`);

    const ss = new ServerSign();
    ss.getSignContext(text, (signContext) => {
      res.json({
        file: text,
        sign: signContext,
      });
    });
  } catch (e) {
    console.log("Signature error: ", e);
    res.status(409).json({ msg: "Signature error" });
  }
});

app
  .listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.log(`ERROR: ${err.code}`);
  });
