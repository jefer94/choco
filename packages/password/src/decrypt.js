"use strict";
exports.__esModule = true;
exports.decrypt = void 0;
var bcrypt_1 = require("bcrypt");
function decrypt(password, hash) {
    return bcrypt_1["default"].compare(password, hash);
}
exports.decrypt = decrypt;
