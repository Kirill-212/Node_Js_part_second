const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const users = [
  { id: 1, first_name: "1", phone_number: "1", last_name: "1" },
  { id: 2, first_name: "1", phone_number: "1", last_name: "1" },
  { id: 3, first_name: "1", phone_number: "1", last_name: "1" },
];
app.get("/TS", (request, response) => {
  response.json(users.filter(Boolean));
});
app.post("/TS", (request, response) => {
  console.log(request.body);
  users.push(request.body);
  response.json(users.filter(Boolean));
});

app.put("/TS", (request, response) => {
  console.log(request.body);
  for (let i = 0; i < users.length; i++) {
    console.log(users[i]["id"]);
    if (users[i]["id"] === request.body["id"]) {
      users[i] = request.body;
      console.log(users[i]);
    }
  }
  //users.push(request.body);
  response.json(users.filter(Boolean));
});

app.delete("/TS", (request, response) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i]["id"] == request.body["id"]) {
      console.log(users[i]["id"]);
      delete users[i];
    }
  }
  //users.push(request.body);
  response.json(users.filter(Boolean));
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log("run");
});
