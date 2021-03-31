var redis = require("redis");

client = redis.createClient(
  "//redis-10746.c8.us-east-1-4.ec2.cloud.redislabs.com:10746",
  { password: "8dD0IwdNp8GPTkfoiKNyJikgk44w11bG" }
);

module.exports = {
  AddBlackList: (username, jwt) => {
    client = redis.createClient(
      "//redis-10746.c8.us-east-1-4.ec2.cloud.redislabs.com:10746",
      { password: "8dD0IwdNp8GPTkfoiKNyJikgk44w11bG" }
    );
    client.get(username, (err, result) => {
      if (result == null) {
        client.set(username, jwt);
      } else {
        client.set(username, result + "|" + jwt);
      }
      client.get(username, async (err, result) => {
        console.log(result.split("|"));
      });
    });
  },
  GetAll: async (username) => {
    return await client.get(username, async (err, result) => {
      return await result.split("|");
    });
  },
  CheckBlackList: async (username, jwt) => {
    // client.del(username);
    return new Promise(function (resolve, reject) {
      client.get(username, (err, result) => {
        console.log("1");
        if (result == null) resolve(true);
        let res = result.split("|");
        console.log(res.indexOf(jwt));
        if (res.indexOf(jwt) == -1) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  },
};
// return new Promise(function (resolve, reject) {
//   client.get(username, (err, result) => {
//     console.log("1");
//     if (result == null) resolve(true);
//     let res = result.split("|");
//     console.log(res.indexOf(jwt));
//     if (res.indexOf(jwt) == -1) {
//       resolve(true);
//     } else {
//       resolve(false);
//     }
//   });
// });

// function getStuffAsync(param) {
//   return new Promise(function (resolve, reject) {
//     getStuff(param, function (err, data) {
//       if (err !== null) reject(err);
//       else resolve(data);
//     });
//   });
// }
