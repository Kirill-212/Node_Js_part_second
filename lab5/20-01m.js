const Users = require("./users").Users;

const getCredential = (user) => {
  let u = Users.find((e) => {
    return e.users.toLowerCase() == user.toLowerCase();
  });
  return u;
};

const verPassword = (pass1, pass2) => {
  return pass1 == pass2;
};

module.exports = {
  getCredential: getCredential,
  verPassword: verPassword,
};
