const assert = require("chai").assert;
const { it } = require("mocha");
const { checkforValidUser, checkforNullUser } = require("./functions.test");

describe("Valid user",() => {
    it("Should return a valid user object from the db", () => {
        setTimeout(() => {
            assert.typeOf(checkforValidUser("625fd41c470c1d138d093abe"), "object")
        },2000)
    })
})

describe("Invalid user",() => {
    it("Should not return a user object from the db", () => {
        setTimeout(() => {
            assert.typeOf(checkforNullUser("625fd41c470c1d138d0_fake"), "null")
        },2000)
    })
})



// Resources:
// Video owner: Traversy Media
// Video title: Intro To JavaScript Unit Testing With Mocha JS & Chai
// URL: https://youtu.be/MLTRHc5dk6s