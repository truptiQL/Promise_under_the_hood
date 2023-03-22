class _Promise {
  constructor(func) {
    this.state = "pending";
    this.data = undefined;

    func(this._resolve.bind(this), this._reject.bind(this));
  }

  _resolve(value) {
    this.state = "resolved";
    this.data = value;
  }

  _reject(value) {
    this.state = "rejected";
    this.data = value;
  }

  then(onFulfilled, onReject = () => {}) {
    return new _Promise((resolve, reject) => {
      if (this.state === "resolved") {
        try {
          const result = onFulfilled(this.data);
          if (result instanceof _Promise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      } else if (this.state === "rejected") {
        try {
          const result = onReject(this.data);
          if (result instanceof _Promise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      }
    });
  }

  catch(onReject) {
    return new _Promise((resolve, reject) => {
      if (this.state === "rejected") {
        try {
          const result = onReject(this.data);
          if (result instanceof _Promise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      } else {
        resolve(this.data);
      }
    });
  }
}

/* ### FIRST TEST CASE WITHOUT CHAINING
const promise = new _Promise((_resolve, _reject) => {
  let a = 1;
   let b = 2;
  if (a === b) {
    _resolve("true");
  } else _reject("false");
});


function printResult(data) {
  console.log(data);
}


promise.then((data) => {
  console.log(data);
}, printResult);
promise.catch(PrintResult);
*/

/* ### SECOND TEST CASE FOR THEN CHAINING

let countValue = new _Promise(function (resolve, reject) {
    resolve("Promise resolved");
  });
  
  countValue
    .then(function successValue(result) {
      console.log(result);
    })
  
    .then(function successValue1() {
      console.log("You can call multiple functions this way.");
    });
*/

/* ### THIRD TEST CASE FOR CATCH 

    let countValue2 = new Promise(function (resolve, reject) {
        reject('Promise rejected'); 
     });
     countValue2.then(
         function successValue(result) {
             console.log(result);
         },
      )
     
     // executes if there is an error
     .catch(
         function errorValue(result) {
             console.log(result);
         }
     );
    */

