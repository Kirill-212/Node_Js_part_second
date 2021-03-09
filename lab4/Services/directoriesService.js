const fs = require("fs");

module.exports = {
  getAll: () => {
    return JSON.parse(fs.readFileSync("directories.json", "utf8"));
  },
  Add: (json) => {
    let result = JSON.parse(fs.readFileSync("directories.json", "utf8"));
    console.log(result.length);
    let item =
      "}," +
      JSON.stringify({
        id: result[result.length - 1][["id"]] + 1,
        name: json["name"],
        phone_number: json["phone_number"],
      }) +
      "]";
    fs.writeFileSync(
      "directories.json",
      JSON.stringify(result).replace("}]", item)
    );
  },
  Delete: (json) => {
    let result = JSON.parse(fs.readFileSync("directories.json", "utf8"));
    delete result;
    for (var i = 0; i < result.length; i++) {
      if (result[i]["id"] == json["id"]) {
        result.splice(i, 1);
        break;
      }
    }
    //result.splice(json, 1);
    console.log(result);
    fs.writeFileSync("directories.json", JSON.stringify(result));
  },
  Update: (json) => {
    let result = JSON.parse(fs.readFileSync("directories.json", "utf8"));
    delete result;
    for (var i = 0; i < result.length; i++) {
      if (result[i]["id"] == json["id"]) {
        result[i]["name"] = json["name"];
        result[i]["phone_number"] = json["phone_number"];
        break;
      }
    }
    //result.splice(json, 1);
    console.log(result);
    fs.writeFileSync("directories.json", JSON.stringify(result));
  },
};
