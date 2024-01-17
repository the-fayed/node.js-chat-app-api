class ApiError extends Error {
  public status: string;

  constructor(public message: string, public statuscode: number) {
    super(message);
    this.statuscode = statuscode;
    this.status = `${statuscode}`.startsWith('4') ? 'error': 'fail';
  }
}

export default ApiError;