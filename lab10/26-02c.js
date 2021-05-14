const app = require("express")();
const fs = require("fs");
const { ClientVerify } = require("./m24-07-02");

const request = require("request-promise");

const PORT = 3001;

app
  .listen(PORT, async () => {
    await request({
      method: "GET",
      uri: "http://localhost:3000/signature",
      json: true,
    })
      .then((response) => {
        let signature = response.sign;
        let txt = response.file;

        const text = fs.createReadStream(`${__dirname}/fileC.txt`);
        let data = "";
        text.on("data", (chunk) => {
          data += chunk.toString();
        });

        let cv = new ClientVerify();
        cv.verify(signature, text, (result) => {
          if (result) {
            console.log("Signature verifyed, text: ", data);
          } else {
            console.log("Signature not verifyed");
          }
        });
      })
      .catch((err) => {
        console.log(`ERROR: ${err}`);
      });
  })
  .on("error", (err) => {
    console.log(`ERROR: ${err.code}`);
  });
