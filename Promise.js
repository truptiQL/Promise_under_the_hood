class _Promise {
  constructor(func) {
    this.state = "pending";       //there are 3 states that can be "pending", "resolved", or "rejected"
    this.data = undefined;

    func(this._resolve.bind(this), this._reject.bind(this));    //binding argument of function passed in constructor with _resolve and _reject method
  }

  _resolve(value) {
    this.state = "resolved";
    this.data = value;
  }

  _reject(value) {
    this.state = "rejected";
    this.data = value;
  }

  then(onFulfilled, onReject = () => {}) {          //Error can also be handled in then also, then is returning promise
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
    return new _Promise((resolve, reject) => {      // catch also returns promise
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

module.exports = _Promise;
