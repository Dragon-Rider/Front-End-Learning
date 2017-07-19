/**
 * Test Action
 * */
"use strict";
const RaiderAjax = require("@dp/raider-ajax");

module.exports = RaiderAjax.create(function*(ctx, result) {
    result.setCode(200);
    result.setData({
        hello: "world"
    });
});
