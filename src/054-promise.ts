
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise2 {
  /** 当前状态 */
  private status: string = PENDING;
  /** 成功值 */
  private value: any = null;
  /** 失败原因 */
  private reason: string | null = null;

  constructor(callback: Function) {
    callback(this.resolve, this.reject)
  }

  public resolve = (value: any) => {
    if (this.status !== PENDING) {
      return
    }
    this.status = FULFILLED
    this.value = value
  }
 
  public reject = (reason: string | null) => {
    if (this.status !== PENDING) {
      return
    }
    this.status = REJECTED
    this.reason = reason
  }

  public then(successCallback: Function, errorCallback: Function) {
    if (this.status === FULFILLED) {
      successCallback(this.value)
    } else if (this.status === REJECTED) {
      errorCallback(this.reason)
    }
  }
}

export default Promise2