let expect = require("chai").expect;
let _Promise = require("../promise");

describe("basic test", function () {
  it("should work well with one then and one catch", function () {
    const a = 1;
    b = 1;
    const pr = new _Promise((res, rej) => {
      if (a === b) {
        res("true");
      } else {
        rej(false);
      }
    });

    pr.then((data) => {
      expect(data).toBe(true);
    });
    pr.catch((value) => {
      expect(value).toBe(false);
    });
  });
});

describe("then chaining", function () {
  it("multiple then should work , chaining", function () {
    let pr = new _Promise(function (resolve, reject) {
      resolve("Promise resolved");
    });

    pr.then((result) => {
      console.log(result);
    }).then((msg) => {
      expect(msg).toBe(msg + " Successfully!");
    });
  });
});

describe("then catch chaining", function () {
  it("catch after then should work", function () {
    let countValue2 = new Promise(function (resolve, reject) {
      reject("Promise rejected");
    });
    countValue2
      .then((result) => {
        console.log(result);
      })
      .catch((result) => {
        expect(result).toBe("Promise rejected");
      });
  });
});
