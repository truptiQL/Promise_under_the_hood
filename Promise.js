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

module.exports = _Promise;
