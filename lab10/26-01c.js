const app = require("express")();
const fs = require("fs");
const crypto = require("crypto");
const { ClientDH } = require("./m24-07");

const request = require("request-promise");

const PORT = 3001;

app
  .listen(PORT, async () => {
    await request({
      method: "GET",
      uri: "http://localhost:3000/",
      json: true,
    })
      .then((response) => {
        if (response) {
          const clientDH = new ClientDH(response);
          const clientSecret = clientDH.getSecret(response);
          const clientContext = clientDH.getContext();

          request({
            method: "GET",
            uri: "http://localhost:3000/resourse",
            json: true,
            body: clientContext,
          })
            .then((response) => {
              let text = response.txt.toString("utf8");
              console.log(`Encrypted text: ${text}`);

              const decipher = crypto.createDecipher(
                "aes256",
                clientSecret.toString()
              );
              const decrypted =
                decipher.update(text, "hex", "utf8") + decipher.final("utf8");
              fs.writeFileSync("Decrypt.txt", decrypted);
              console.log(`Decrypted text: ${decrypted}`);
            })
            .catch((err) => {
              console.log(`ERROR: ${err}`);
            });
        }
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
      });
  })
  .on("error", (err) => {
    console.log(`ERROR: ${err.code}`);
  });
