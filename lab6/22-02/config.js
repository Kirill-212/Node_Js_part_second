module.exports = {
  jwt: {
    secret: "lox",
    tokens: {
      access: {
        type: "access",
        expiresIn: "10m",
      },
      refresh: {
        type: "refresh",
        expiresIn: "1440m",
      },
    },
  },
  accessOptions: {
    maxAge: 1000 * 60 * 10,
    httpOnly: true,
    SameSite: "Strict",
  },
  refreshOptions: {
    maxAge: 1000 * 60 * 1440,
    httpOnly: true,
    sameSite: "Strict",
    path: "/",
    //path: "/refresh-token",
  },
};
