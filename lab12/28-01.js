const express = require("express");
const bodyParser = require("body-parser");
const jsonRouter = require("express-json-rpc-router");

const app = express();

const controller = {
  sum(params, raw) {
    return params.reduce(function (previousValue, currentValue, index, array) {
      return previousValue + currentValue;
    });
  },
  mul(params, raw) {
    return params.reduce(function (previousValue, currentValue, index, array) {
      return previousValue * currentValue;
    });
  },
  div(params, raw) {
    return params[0] / params[1];
  },
  proc(params, raw) {
    return (params[0] / params[1]) * 100;
  },
};

let validator = function (params, _, raw) {
  console.log(_);
  if (!Array.isArray(params)) throw new Error("is not array");
  if (params.length != 2) throw new Error("only two param");
  if (!Number.isInteger(params[0]) || !Number.isInteger(params[1]))
    throw new Error("only param type is number");

  return params;
};
let validator_array = function (params, _, raw) {
  //   console.log(params.every((elem) => Number.isInteger(elem)));
  if (!Array.isArray(params)) throw new Error("is not array");
  if (!params.every((elem) => Number.isInteger(elem)))
    throw new Error("only param type is number");

  return params;
};
const beforeController = {
  sum: (params, _, raw) => validator_array(params, _, raw),
  mul: (params, _, raw) => validator_array(params, _, raw),
  div: (params, _, raw) => validator(params, _, raw),
  proc: (params, _, raw) => validator(params, _, raw),
};

app.use(bodyParser.json());
app.use(
  jsonRouter({
    methods: controller,
    beforeMethods: beforeController,
    onEror(err) {
      console.log(err);
    },
  })
);

app.listen(3000);
