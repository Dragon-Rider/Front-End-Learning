/**
 * Test Action
 * */
"use strict";

module.exports = function*() {


    yield this.render("page", {
        text: "hello world"
    });

};