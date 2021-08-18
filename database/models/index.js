const { dbConfig } = require("../../config");

dbConfig();

module.exports = {
    user: require("./user.model"),
    adminUser: require("./adminUser.model"), 
};
