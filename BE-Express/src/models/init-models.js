var DataTypes = require("sequelize").DataTypes;
var _customer = require("./customer");

function initModels(sequelize) {
  var customer = _customer(sequelize, DataTypes);


  return {
    customer,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
