const express = require("express");
const app = require("express")();
const hbs = require("express-handlebars").create({
  extname: ".hbs",
  helpers: {
    cancel: () => {
      return '<a href="http://localhost:3000/" class="button1">cancel</a>';
    },
  },
});
const service = require("./Services/directoriesService");
const url = require("url");
const jsonParser = express.json();
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { list: service.getAll(), btn: true });
});

app.get("/Add", (req, res) => {
  res.render("Add", { list: service.getAll(), btn: false });
});
app.get("/Update", (req, res) => {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  let result = service.getAll();
  let send;
  for (var i = 0; i < result.length; i++) {
    if (result[i]["id"] == query["id"]) {
      send = result[i];
      break;
    }
  }
  console.log(result);
  res.render("Update", {
    list: service.getAll(),
    name: send["name"],
    phone_number: send["phone_number"],
    id: send["id"],
    btn: false,
  });
});

app.post("/Add", jsonParser, (req, res) => {
  console.log(req.body);
  service.Add(req.body);
  res.status(200).send();
});
app.post("/Update", jsonParser, (req, res) => {
  service.Update(req.body);
  res.status(200).send();
});
app.post("/Delete", jsonParser, (req, res) => {
  service.Delete(req.body);
  res.status(200).send();
});
app.listen(3000, () => console.log("Server started"));
